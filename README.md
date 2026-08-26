# E-Commerce Monorepo

Monorepo built with **pnpm workspaces** + **Turborepo** for an e-commerce project.

## Project Structure

```text
ecommerce/
├── apps/
│   ├── server/              # REST API (NestJS + Express)
│   │   ├── src/
│   │   │   ├── dto/         # Data transfer objects
│   │   │   ├── app.module.ts
│   │   │   ├── app.controller.ts
│   │   │   ├── app.service.ts
│   │   │   └── main.ts
│   │   ├── Dockerfile       # Multi-stage build (Node → prod)
│   │   └── tsconfig.json
│   └── web/                 # SPA (React + Vite)
│       ├── src/
│       │   ├── app.tsx
│       │   ├── router.tsx
│       │   └── main.tsx
│       ├── Dockerfile       # Multi-stage build (Node → nginx)
│       ├── nginx.conf       # SPA routing + API proxy
│       └── tsconfig.json
├── libs/
│   ├── db/                  # Database layer
│   ├── shared/              # Shared types and utilities
│   └── ui/                  # UI components (Button, cn)
├── .github/
│   ├── workflows/ci.yml     # CI (lint, typecheck, test, docker build)
│   └── dependabot.yml       # Automated dependency updates
├── .husky/                  # Git hooks (pre-commit, commit-msg)
├── .vscode/                 # Shared editor settings
├── commitlint.config.mjs    # Conventional commits
├── docker-compose.yml       # Docker orchestration
├── eslint.config.mjs        # Flat config (ESLint 9+)
├── turbo.json               # Turborepo pipeline
└── tsconfig.base.json       # Shared TypeScript config
```

## Stack

| Tool         | Version | Purpose                         |
| ------------ | ------- | ------------------------------- |
| Node.js      | >= 24   | Runtime (native TypeScript)     |
| pnpm         | 11.8.0  | Package manager (workspaces)    |
| TypeScript   | 5.9.3   | Type checking                   |
| Turborepo    | 2.10.11 | Build system and caching        |
| NestJS       | 11.1.7  | Server framework                |
| React        | 19.2.8  | UI library                      |
| Vite         | 8.2.2   | Frontend build tool             |
| Tailwind CSS | 4.3.3   | Utility-first CSS               |
| ESLint       | 10.9.0  | Linting                         |
| Prettier     | 3.9.6   | Code formatting                 |
| Vitest       | 4.1.11  | Testing                         |
| Husky        | 9.1.7   | Git hooks                       |
| lint-staged  | 17.3.0  | Pre-commit checks               |
| commitlint   | 21.2.2  | Conventional commits            |
| Swagger      | -       | API documentation (`/api/docs`) |
| Docker       | -       | Containerization                |

## Requirements

- Node.js >= 24
- pnpm (installed automatically via `corepack`)

The `.nvmrc` file at the root pins the Node.js version. Run `nvm use` or `fnm use` to switch automatically.

## Installation

```bash
corepack enable
pnpm install
```

## Commands

### Development

```bash
pnpm dev              # Start all projects in watch mode
pnpm build            # Build all projects
pnpm clean            # Clean dist and coverage
```

### Code Quality

```bash
pnpm lint             # Check lint
pnpm lint:fix         # Auto-fix lint
pnpm format           # Format files
pnpm format:check     # Check formatting
pnpm typecheck        # Check types
```

### Testing

```bash
pnpm test             # Run tests
pnpm test:coverage    # Run tests with coverage
pnpm test:watch       # Run tests in watch mode
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

## Docker

Build and run with Docker Compose:

```bash
docker compose up --build
```

| Service | Port | Description               |
| ------- | ---- | ------------------------- |
| web     | 80   | React SPA served by nginx |
| server  | 3000 | NestJS API                |

The web container proxies `/api` requests to the server container.

## CI/CD

### GitHub Actions

Pipeline runs on every PR and push to `main`:

**ci** job:

1. Install dependencies (frozen lockfile)
2. Lint
3. Format check
4. Typecheck
5. Build
6. Test

**docker** job (runs after ci):

1. Build server Dockerfile
2. Build web Dockerfile

Both use GitHub Actions cache for Docker layer caching.

### Dependabot

Configured to update dependencies weekly:

- npm dependencies (grouped by dev/production)
- GitHub Actions

### Git Hooks (Husky + lint-staged + commitlint)

On every commit:

- **ESLint** + **Prettier** on staged files (pre-commit)
- **Commitlint** enforces conventional commits (commit-msg)

Accepted commit types: `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `revert`

## Configuration

### TypeScript

- `tsconfig.base.json` - Shared strict configuration (ES2023, strict mode)
- Each package extends the base with specific module/resolution settings
- Libs use CJS output, apps use their native format (ESM for web, CJS for server)

### ESLint

- `eslint.config.mjs` - Flat config (ESLint 9+)
- Plugins: `@typescript-eslint`, `simple-import-sort`, `prettier`

### Prettier

- `.prettierrc` - Format config (no semicolons, single quotes, trailing commas)
- `prettier-plugin-tailwindcss` - Automatic Tailwind class sorting

### Environment Variables

Each app has its own `.env` and `.env.example`:

- `apps/server/.env` - Server config (PORT, DATABASE_URL, JWT_SECRET, etc.)
- `apps/web/.env` - Web config (VITE_API_URL)

## License

Private - All rights reserved.
