import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LikesService {
  constructor(private readonly prisma: PrismaService) {}

  async toggleLike(postId: string, userId: string) {
    const post = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new NotFoundException('Post not Found');
    }

    const existingLike = await this.prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (existingLike) {
      await this.prisma.like.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });

      return {
        liked: false,
      };
    }

    await this.prisma.like.create({
      data: {
        userId,
        postId,
      },
    });

    return {
      liked: true,
    };
  }
}
