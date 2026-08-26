export interface DatabaseConfig {
  host: string
  port: number
  database: string
  username: string
  password: string
}

export const databaseConfig: DatabaseConfig = {
  host: 'localhost',
  port: 5432,
  database: 'ecommerce',
  username: 'postgres',
  password: 'password',
}
