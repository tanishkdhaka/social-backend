import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateCommentDto } from './dto/comments.dto';

@Controller('posts')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @Post(':postId/comments')
  @UseGuards(JwtAuthGuard)
  create(
    @Param('postId') postId: string,
    @Body() dto: CreateCommentDto,
    @Req() req: any,
  ) {
    return this.commentsService.create(dto, req.user.id, postId);
  }
}
