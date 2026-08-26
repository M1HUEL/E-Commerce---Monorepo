import { Button } from '@ecommerce/ui'

import { useProducts } from '@/features/products/use-products'

export const ProductList = () => {
  const { products, loading } = useProducts()

  return (
    <div>
      <h1>Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>${product.price}</p>
            </li>
          ))}
        </ul>
      )}
      <Button>Refresh</Button>
    </div>
  )
}
