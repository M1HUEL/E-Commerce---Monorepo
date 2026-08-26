import { databaseConfig } from '@ecommerce/db'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { HealthResponseDto } from '@/dto/health-response.dto'

@Injectable()
export class AppService {
  constructor(private readonly config: ConfigService) {}

  getHealth(): HealthResponseDto {
    return {
      status: `OK - ${this.config.get<string>('NODE_ENV', 'development')} - DB connected to ${databaseConfig.host}:${databaseConfig.port}/${databaseConfig.database}`,
      timestamp: new Date(),
    }
  }
}
