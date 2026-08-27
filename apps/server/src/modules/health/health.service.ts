import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { HealthResponseDto } from '@/modules/health/dto/health-response.dto'

@Injectable()
export class HealthService {
  constructor(private readonly config: ConfigService) {}

  getHealth(): HealthResponseDto {
    const databaseUrl = this.config.get<string>('DATABASE_URL', '')

    const {
      host = 'unknown',
      port = 'unknown',
      database = 'unknown',
    } = this.parseDatabaseUrl(databaseUrl)

    return {
      status: `OK - ${this.config.get<string>('NODE_ENV', 'development')} - DB connected to ${host}:${port}/${database}`,
      timestamp: new Date(),
    }
  }

  private parseDatabaseUrl(url: string): {
    host?: string
    port?: string
    database?: string
  } {
    if (!url) {
      return {}
    }

    try {
      const parsed = new URL(url)
      return {
        host: parsed.hostname,
        port: parsed.port,
        database: parsed.pathname.replace(/^\//, ''),
      }
    } catch {
      return {}
    }
  }
}
