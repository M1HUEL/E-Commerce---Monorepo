FROM node:24-alpine AS builder
RUN corepack enable && corepack prepare pnpm@11.8.0 --activate
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY tsconfig.base.json ./
COPY apps/server/package.json apps/server/tsconfig.json ./apps/server/
COPY libs/shared/package.json libs/shared/tsconfig.json ./libs/shared/
COPY libs/db/package.json libs/db/tsconfig.json ./libs/db/

RUN pnpm install --frozen-lockfile

COPY libs/shared/ ./libs/shared/
COPY libs/db/ ./libs/db/
COPY apps/server/ ./apps/server/

RUN pnpm --filter @ecommerce/shared build
RUN pnpm --filter @ecommerce/db build
RUN pnpm --filter @ecommerce/server build

FROM node:24-alpine AS runner
RUN corepack enable && corepack prepare pnpm@11.8.0 --activate
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/server/package.json ./apps/server/
COPY libs/shared/package.json ./libs/shared/
COPY libs/db/package.json ./libs/db/

RUN pnpm install --frozen-lockfile --prod --ignore-scripts

COPY --from=builder /app/apps/server/dist ./apps/server/dist
COPY --from=builder /app/libs/shared/dist ./libs/shared/dist
COPY --from=builder /app/libs/db/dist ./libs/db/dist

EXPOSE 3000
CMD ["node", "apps/server/dist/main.js"]
