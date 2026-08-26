import { Injectable } from '@nestjs/common'

import { UserDto } from '@/modules/users/dto/user.dto'

const USERS: (UserDto & { password: string })[] = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin',
    password: '$2a$10$hashedpassword',
  },
]

@Injectable()
export class UsersService {
  findByEmail(email: string): (UserDto & { password: string }) | undefined {
    return USERS.find((u) => u.email === email)
  }

  findById(id: string): UserDto | undefined {
    return USERS.find((u) => u.id === id)
  }

  create(data: Omit<UserDto, 'id'> & { password: string }): UserDto {
    const user = { id: String(USERS.length + 1), ...data }
    USERS.push(user)
    return { id: user.id, email: user.email, name: user.name }
  }
}
