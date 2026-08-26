import type { Product } from '@ecommerce/shared'
import { Button } from '@ecommerce/ui'
import { useEffect, useState } from 'react'

export const App = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
  }, [])

  return (
    <div>
      <h1>Products</h1>
      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>${product.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
      <Button>Refresh</Button>
    </div>
  )
}
