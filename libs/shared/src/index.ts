export interface HealthResponse {
  status: string
  timestamp: Date
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
}
