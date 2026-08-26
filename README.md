# E-Commerce Monorepo

Monorepo built with **pnpm workspaces** + **Turborepo** for an e-commerce project.

## Quick Start

```bash
# 1. Clone
git clone https://github.com/M1HUEL/E-Commerce---Monorepo.git
cd E-Commerce---Monorepo

# 2. Enable corepack (pnpm)
corepack enable

# 3. Install dependencies
pnpm install

# 4. Copy env files
cp apps/server/.env.example apps/server/.env
cp apps/web/.env.example apps/web/.env

# 5. Start dev servers
pnpm dev
```

The web app runs at `http://localhost:5173` and proxies API requests to the server at `http://localhost:3000`.

### With Docker

```bash
git clone https://github.com/M1HUEL/E-Commerce---Monorepo.git
cd E-Commerce---Monorepo
cp apps/server/.env.example apps/server/.env
cp apps/web/.env.example apps/web/.env
docker compose up --build
```

Web at `http://localhost:80`, API at `http://localhost:3000`.

## End-to-End Example: Products

This boilerplate includes a working products feature that demonstrates how all layers connect:

```
libs/shared/src/index.ts     → Product interface (shared types)
apps/server/src/products.*   → GET /api/products (NestJS controller + service)
apps/web/src/app.tsx         → Fetches and renders product list (React)
```

1. **Shared** — `Product` type in `libs/shared` is imported by both server and web
2. **Server** — `ProductsController` serves `GET /api/products` with mock data
3. **Web** — `App` component fetches `/api/products` and renders the list using `Button` from `libs/ui`

### Try it

Start dev servers with `pnpm dev`, then:

- **API**: `curl http://localhost:3000/api/products` → returns JSON array of products
- **Swagger**: `http://localhost:3000/api/docs` → interactive API docs
- **Web**: `http://localhost:5173` → renders product list with UI components

## Project Structure

```text
ecommerce/
├── apps/
│   ├── server/              # REST API (NestJS + Express)
│   │   ├── src/
│   │   │   ├── dto/         # Data transfer objects
│   │   │   ├── app.*        # Health endpoint
│   │   │   ├── products.*   # Products endpoint
│   │   │   └── main.ts
│   │   ├── Dockerfile
│   │   └── tsconfig.json
│   └── web/                 # SPA (React + Vite)
│       ├── src/
│       │   ├── app.tsx      # Products page
│       │   ├── router.tsx
│       │   └── main.tsx
│       ├── Dockerfile
│       ├── nginx.conf
│       └── tsconfig.json
├── libs/
│   ├── db/                  # Database layer
│   ├── shared/              # Shared types (HealthResponse, Product)
│   └── ui/                  # UI components (Button, cn)
├── .github/workflows/ci.yml # CI (lint, typecheck, test, docker build)
├── commitlint.config.mjs    # Conventional commits
├── docker-compose.yml       # Docker orchestration
├── turbo.json               # Turborepo pipeline
└── tsconfig.base.json       # Shared TypeScript config
```

## Stack

| Tool           | Purpose                      |
| -------------- | ---------------------------- |
| Node.js >= 24  | Runtime (native TypeScript)  |
| pnpm 11.8      | Package manager (workspaces) |
| TypeScript 5.9 | Type checking                |
| Turborepo 2.10 | Build system and caching     |
| NestJS 11      | Server framework + Swagger   |
| React 19       | UI library                   |
| Vite 8         | Frontend build tool          |
| Tailwind CSS 4 | Utility-first CSS            |
| ESLint 10      | Linting (flat config)        |
| Prettier 3     | Code formatting              |
| Vitest 4       | Testing                      |
| Husky 9        | Git hooks                    |
| commitlint 21  | Conventional commits         |
| Docker         | Containerization             |

## Commands

```bash
pnpm dev              # Start all projects in watch mode
pnpm build            # Build all projects
pnpm test             # Run tests
pnpm test:coverage    # Run tests with coverage
pnpm lint             # Check lint
pnpm lint:fix         # Auto-fix lint
pnpm format           # Format files
pnpm format:check     # Check formatting
pnpm typecheck        # Check types
pnpm clean            # Clean dist and coverage
```

### Package-specific

```bash
pnpm --filter @ecommerce/server dev
pnpm --filter @ecommerce/web dev
pnpm --filter @ecommerce/server build
pnpm --filter @ecommerce/shared test
```

## Path Aliases

Both apps use `@/` as alias for `src/`:

```ts
// Instead of
import { App } from '../../app'

// Use
import { App } from '@/app'
```

- **Web (Vite)**: `resolve.alias` in `vite.config.ts` + `paths` in `tsconfig.json`
- **Server (NestJS)**: `tsconfig-paths` for dev, `tsc-alias` for build

## CI/CD

GitHub Actions runs on every PR and push to `main`:

**ci** job: lint → format → typecheck → build → test

**docker** job: builds both Dockerfiles to verify they compile

## Environment Variables

Each app has its own `.env` (see `.env.example`):

| App    | Variable         | Description     | Default                 |
| ------ | ---------------- | --------------- | ----------------------- |
| server | `NODE_ENV`       | Environment     | `development`           |
| server | `PORT`           | Server port     | `3000`                  |
| server | `DATABASE_URL`   | PostgreSQL URL  | -                       |
| server | `JWT_SECRET`     | JWT signing key | -                       |
| server | `JWT_EXPIRES_IN` | JWT expiration  | `7d`                    |
| web    | `VITE_API_URL`   | API base URL    | `http://localhost:3000` |

## License

[MIT](LICENSE)
