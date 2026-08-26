import { Controller, Get, Param } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'

import { ProductDto } from '@/modules/products/dto/product.dto'
import { ProductsService } from '@/modules/products/products.service'

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiOkResponse({ type: ProductDto, isArray: true })
  findAll(): ProductDto[] {
    return this.productsService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiOkResponse({ type: ProductDto })
  findOne(@Param('id') id: string): ProductDto | undefined {
    return this.productsService.findOne(id)
  }
}
