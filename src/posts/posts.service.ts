import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePostDto, userId: string) {
    return this.prisma.post.create({
      data: {
        content: dto.content,
        authorId: userId,
      },
    });
  }
  async getFeed(userId: string, pagination: PaginationDto) {
    const { page, limit } = pagination;

    return this.prisma.post.findMany({
      where: {
        author: {
          followers: {
            some: {
              followerId: userId,
            },
          },
        },
      },
      skip: (page - 1) * limit,
      take: limit,

      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  async getExploreFeed(pagination: PaginationDto) {
    const { page, limit } = pagination;

    return this.prisma.post.findMany({
      skip: (page - 1) * limit,
      take: limit,

      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  async findAll() {
    return this.prisma.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  async getPost(id: string) {
    const post = await this.prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
          },
        },
        comments: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }
}
