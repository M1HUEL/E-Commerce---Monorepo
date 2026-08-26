import type { HealthResponse } from '@ecommerce/shared'
import { Button } from '@ecommerce/ui'
import { useEffect, useState } from 'react'

export const App = () => {
  const [health, setHealth] = useState<HealthResponse | null>(null)

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => setHealth(data))
  }, [])

  return (
    <div>
      <h1>Health</h1>
      {health && (
        <div>
          <p>Status: {health.status}</p>
          <p>Timestamp: {health.timestamp.toString()}</p>
          <Button>Refresh</Button>
        </div>
      )}
    </div>
  )
}
