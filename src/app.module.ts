import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { FollowsModule } from './follows/follows.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    PostsModule,
    CommentsModule,
    LikesModule,
    FollowsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
