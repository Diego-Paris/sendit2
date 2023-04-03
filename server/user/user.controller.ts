import { Body, Controller, Get, Param, Put, UseGuards } from "@nestjs/common";
import { User } from "@prisma/client";
import Identify from "@/server/common/identify.decorator";
import { AuthGuard } from "@/server/guards/auth.guard";
import { UserDTO } from "@/server/user/user.dto";
import { UserService } from "@/server/user/user.service";
import { HttpException, HttpStatus } from "@nestjs/common";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get(":username")
  async getUserByUsername(@Param("username") username: string): Promise<User> {
    let user: User;

    if (username.includes("@")) {
      user = await this.userService.findOne({ email: username });
    } else {
      user = await this.userService.getUserByUsername(username);
    }

    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    return user;
  }

  // @UseGuards(AuthGuard)
  @Put(":email")
  async updateCurrentUser(
    @Param("email") email: string,
    @Body() data: UserDTO
  ) {
    console.log("!!!", email);
    console.log("!!!", data);
    const userToUpdate = await this.userService.findOne({ email });

    return this.userService.update({
      where: { email },
      data: { ...userToUpdate, ...data },
    });
  }

  // @UseGuards(AuthGuard)
  // @Put()
  // updateCurrentUser (@Body() data: UserDTO, @Identify() email: string): Promise<User> {
  //   return this.userService.updateCurrentUser(data, email)
  // }
}
