import { Controller, Param, Post, Req, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LikesService } from './likes.service';

@Controller('posts')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post(':postId/like')
  @UseGuards(JwtAuthGuard)
  like(@Param('postId') postId: string, @Req() req: any) {
    return this.likesService.toggleLike(postId, req.user.id);
  }
}
