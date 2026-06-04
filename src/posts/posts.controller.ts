import {
  Body,
  Controller,
  Param,
  Post,
  Req,
  UseGuards,
  Get,
  Query,
} from '@nestjs/common';
import { PaginationDto } from './dto/pagination.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Get('feed')
  @UseGuards(JwtAuthGuard)
  feed(@Req() req: any, @Query() pagination: PaginationDto) {
    return this.postsService.getFeed(req.user.id, pagination);
  }

  @Get('explore')
  explore(@Query() pagination: PaginationDto) {
    return this.postsService.getExploreFeed(pagination);
  }
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreatePostDto, @Req() req: any) {
    return this.postsService.create(dto, req.user.id);
  }
  @Get()
  findAll() {
    return this.postsService.findAll();
  }
  @Get(':id')
  getPost(@Param('id') id: string) {
    return this.postsService.getPost(id);
  }
}
