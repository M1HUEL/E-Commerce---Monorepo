import { ApiProperty } from '@nestjs/swagger'

export class ProductDto {
  @ApiProperty({ example: 'p1' })
  id!: string

  @ApiProperty({ example: 'Wireless Headphones' })
  name!: string

  @ApiProperty({ example: 'Premium noise-cancelling headphones' })
  description!: string

  @ApiProperty({ example: 99.99 })
  price!: number

  @ApiProperty({ example: 'https://placehold.co/300x300' })
  image!: string
}
