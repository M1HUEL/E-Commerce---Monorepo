import { ApiProperty } from '@nestjs/swagger'

export class HealthResponseDto {
  @ApiProperty({
    example: 'OK - development - DB connected to localhost:5432/ecommerce',
  })
  status!: string

  @ApiProperty({ example: '2026-08-25T12:00:00.000Z' })
  timestamp!: Date
}
