import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { PrismaService } from "@/server/prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private db: PrismaService) {}

  async getUserByUsername(username: string): Promise<User> {
    return await this.db.user.findUnique({ where: { username } });
  }

  async findOne(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    return this.db.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.db.user.update({
      where,
      data,
    });
  }

  async updateCurrentUser(
    data: Prisma.UserUpdateInput,
    email: string
  ): Promise<User> {
    return await this.db.user.update({
      where: {
        email,
      },
      data,
    });
  }
}
