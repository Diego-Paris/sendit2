import { Controller, Get, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@/server/guards/auth.guard'

@Controller()
export class AppController {
  @Get('/hello')
  helloWorld() {
    return 'Hello, world!'
  }

  @Get('/protected')
  @UseGuards(AuthGuard)
  protected() {
    return 'I am protected!'
  }
}
