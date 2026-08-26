import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import bcrypt from 'bcryptjs'

import { AuthResponseDto } from '@/modules/auth/dto/auth-response.dto'
import { LoginDto } from '@/modules/auth/dto/login.dto'
import { RegisterDto } from '@/modules/auth/dto/register.dto'
import { UsersService } from '@/modules/users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<AuthResponseDto> {
    const user = this.users.findByEmail(dto.email)
    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const valid = await bcrypt.compare(dto.password, user.password)
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const payload = { sub: user.id, email: user.email }
    return {
      access_token: await this.jwt.signAsync(payload),
      token_type: 'Bearer',
    }
  }

  async register(dto: RegisterDto): Promise<AuthResponseDto> {
    const existing = this.users.findByEmail(dto.email)
    if (existing) {
      throw new UnauthorizedException('Email already in use')
    }

    const hashed = await bcrypt.hash(dto.password, 10)
    const user = this.users.create({
      email: dto.email,
      name: dto.name,
      password: hashed,
    })

    const payload = { sub: user.id, email: user.email }
    return {
      access_token: await this.jwt.signAsync(payload),
      token_type: 'Bearer',
    }
  }
}
