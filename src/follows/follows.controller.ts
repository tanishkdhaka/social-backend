import { Controller, Param, Post, Req, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FollowsService } from './follows.service';

@Controller('users')
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  @Post(':userId/follow')
  @UseGuards(JwtAuthGuard)
  follow(@Param('userId') userId: string, @Req() req: any) {
    return this.followsService.toggleFollow(req.user.id, userId);
  }
}
