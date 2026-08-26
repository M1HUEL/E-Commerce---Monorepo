import type { Product } from '@ecommerce/shared'
import { Injectable } from '@nestjs/common'

import { ProductDto } from '@/dto/product.dto'

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'Premium noise-cancelling headphones with 30h battery',
    price: 99.99,
    image: 'https://placehold.co/300x300',
  },
  {
    id: '2',
    name: 'Mechanical Keyboard',
    description: 'RGB backlit with Cherry MX switches',
    price: 149.99,
    image: 'https://placehold.co/300x300',
  },
  {
    id: '3',
    name: 'USB-C Hub',
    description: '7-in-1 hub with HDMI, USB-A, and SD card reader',
    price: 49.99,
    image: 'https://placehold.co/300x300',
  },
]

@Injectable()
export class ProductsService {
  findAll(): ProductDto[] {
    return PRODUCTS
  }

  findOne(id: string): ProductDto | undefined {
    return PRODUCTS.find((p) => p.id === id)
  }
}
