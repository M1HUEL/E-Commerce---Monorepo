import { ApiProperty } from '@nestjs/swagger'

export class UserDto {
  @ApiProperty({ example: 'u1' })
  id!: string

  @ApiProperty({ example: 'user@example.com' })
  email!: string

  @ApiProperty({ example: 'John Doe' })
  name!: string
}
