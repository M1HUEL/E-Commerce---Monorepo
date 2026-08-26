import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from '@/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = app.get(ConfigService)

  app.setGlobalPrefix('api')

  const swagger = new DocumentBuilder()
    .setTitle('E-Commerce API')
    .setDescription('E-Commerce platform REST API')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, swagger)
  SwaggerModule.setup('api/docs', app, document)

  await app.listen(config.get<number>('PORT', 3000))
}
bootstrap()
