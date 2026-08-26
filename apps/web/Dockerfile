FROM node:24-alpine AS builder
RUN corepack enable && corepack prepare pnpm@11.8.0 --activate
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY tsconfig.base.json ./
COPY apps/web/package.json apps/web/tsconfig.json ./apps/web/
COPY libs/shared/package.json libs/shared/tsconfig.json ./libs/shared/
COPY libs/ui/package.json libs/ui/tsconfig.json ./libs/ui/

RUN pnpm install --frozen-lockfile

COPY libs/shared/ ./libs/shared/
COPY libs/ui/ ./libs/ui/
COPY apps/web/ ./apps/web/

RUN pnpm --filter @ecommerce/shared build
RUN pnpm --filter @ecommerce/ui build
RUN pnpm --filter @ecommerce/web build

FROM nginx:stable-alpine
COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html
EXPOSE 80
