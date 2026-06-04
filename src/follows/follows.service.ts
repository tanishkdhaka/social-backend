import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FollowsService {
  constructor(private readonly prisma: PrismaService) {}

  async toggleFollow(followerId: string, followingId: string) {
    if (followerId === followingId) {
      throw new BadRequestException('You cannot follow yourself');
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: followingId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const existingFollow = await this.prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });

    if (existingFollow) {
      await this.prisma.follow.delete({
        where: {
          followerId_followingId: {
            followerId,
            followingId,
          },
        },
      });

      return {
        following: false,
      };
    }

    await this.prisma.follow.create({
      data: {
        followerId,
        followingId,
      },
    });

    return {
      following: true,
    };
  }
}
