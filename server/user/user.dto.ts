import { IsString, IsUrl, MinLength } from 'class-validator'

export class UserDTO {
  @IsString()
  @MinLength(1)
  name: string

  // @IsUrl()
  // image: string

  username?: string

  email?: string
}
