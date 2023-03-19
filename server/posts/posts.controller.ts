import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { AuthGuard } from "../guards/auth.guard";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import Identify from "../common/identify.decorator";
import { Public } from "../common/public.decorator";

@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto, @Identify() email: string) {
    return this.postsService.create({
      ...createPostDto,
      user: { connect: { email } },
    });
  }

  @Get()
  findAll(@Identify() email: string, @Query("user") user?: boolean) {
    if (user) {
      return this.postsService.findAll({ where: { user: { email } } });
    }
    return this.postsService.findAll({});
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.postsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
  //   return this.postsService.update(+id, updatePostDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.postsService.remove(+id);
  // }
}
