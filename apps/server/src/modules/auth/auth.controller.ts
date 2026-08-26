import { Body, Controller, Post } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'

import { AuthService } from '@/modules/auth/auth.service'
import { AuthResponseDto } from '@/modules/auth/dto/auth-response.dto'
import { LoginDto } from '@/modules/auth/dto/login.dto'
import { RegisterDto } from '@/modules/auth/dto/register.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiOkResponse({ type: AuthResponseDto })
  login(@Body() dto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(dto)
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiOkResponse({ type: AuthResponseDto })
  register(@Body() dto: RegisterDto): Promise<AuthResponseDto> {
    return this.authService.register(dto)
  }
}
