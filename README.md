# E-Commerce Monorepo

Monorepo built with **pnpm workspaces** + **Turborepo** for an e-commerce project.

## Infrastructure

```
ecommerce/
├── apps/
│   ├── server/          # Main API (Node.js + TypeScript)
│   └── web/             # Frontend (TypeScript)
├── libs/
│   ├── db/              # Database layer
│   ├── shared/          # Shared utilities
│   └── ui/              # UI components
├── .github/
│   ├── workflows/ci.yml # GitHub Actions CI
│   └── dependabot.yml   # Automated dependency updates
├── .husky/              # Git hooks
├── .vscode/             # Shared configuration
└── turbo.json           # Turborepo configuration
```

## Stack

| Tool        | Version | Purpose                     |
| ----------- | ------- | --------------------------- |
| Node.js     | >= 24   | Runtime (native TypeScript) |
| pnpm        | 11.8.0  | Package manager             |
| TypeScript  | 5.9.3   | Type checking               |
| Turborepo   | 2.10.11 | Build system and caching    |
| ESLint      | 10.9.0  | Linting                     |
| Prettier    | 3.9.6   | Code formatting             |
| Vitest      | 4.1.11  | Testing                     |
| Husky       | 9.1.7   | Git hooks                   |
| lint-staged | 17.3.0  | Pre-commit checks           |

## Requirements

- Node.js >= 24
- pnpm (installed automatically via `corepack`)

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
pnpm lint             # Check lint (global)
pnpm lint:fix         # Auto-fix lint (global)
pnpm format           # Format files (global)
pnpm format:check     # Check formatting (global)
pnpm typecheck        # Check types (via Turbo)
```

### Testing

```bash
pnpm test             # Run tests (via Turbo)
pnpm test:coverage    # Run tests with coverage
pnpm test:watch       # Run tests in watch mode
```

### Package-specific commands

```bash
pnpm --filter @ecommerce/server build
pnpm --filter @ecommerce/web dev
pnpm --filter @ecommerce/shared test
```

## CI/CD Infrastructure

### GitHub Actions

Pipeline runs automatically on every PR and push to `main`:

1. **Checkout** code
2. **Install** dependencies (frozen lockfile)
3. **Lint** - Code verification
4. **Format** - Format verification
5. **Typecheck** - Type verification
6. **Test** - Test execution

### Dependabot

Configured to update dependencies weekly:

- npm dependencies (grouped by dev/production)
- GitHub Actions

### Git Hooks (Husky + lint-staged)

On every commit, automatically runs:

- **ESLint** on `.ts`, `.tsx`, `.js`, `.jsx` files
- **Prettier** on all supported files

## Configuration

### TypeScript

- `tsconfig.base.json` - Shared base configuration
- Each package extends the base with specific configuration
- `tsconfig.vitest.json` - Configuration for tests

### ESLint

- `eslint.config.mjs` - Flat config (ESLint 9+)
- Rules: `@typescript-eslint`, `simple-import-sort`, `prettier`

### Prettier

- `.prettierrc` - Format configuration
- `.prettierignore` - Excluded files

### Editor

- `.editorconfig` - Editor configuration
- `.vscode/settings.json` - Shared settings
- `.vscode/extensions.json` - Recommended extensions

## Environment Variables

Create `.env` file in the root (see `.env.example` if exists).

## License

Private - All rights reserved.
