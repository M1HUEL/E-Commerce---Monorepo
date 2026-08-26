import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppController } from '@/app.controller'
import { AppService } from '@/app.service'
import { ProductsController } from '@/products.controller'
import { ProductsService } from '@/products.service'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController, ProductsController],
  providers: [AppService, ProductsService],
})
export class AppModule {}
