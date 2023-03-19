import { Module } from '@nestjs/common'
import { PrismaService } from '@/server/prisma/prisma.service'
import { UserModule } from '@/server/user/user.module'
import { AppController } from '@/server/app/app.controller'
import { PostsModule } from '../posts/posts.module'

@Module({
  controllers: [AppController],
  imports: [UserModule, PostsModule, PrismaService]
})

export class AppModule {}
