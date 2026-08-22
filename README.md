# Getting Started with TanStack Start starter template

## Using this template

```shell
npx degit samhwang/starter-kit/templates/react-tanstack-start
```

## Batteries included

### Runtime:

- [React](https://reactjs.org) and [TypeScript](https://www.typescriptlang.org/) - The library for web and native user interfaces.
- [TanStack Start](https://tanstack.com/start) - Full-stack React framework with SSR, server functions and middleware.
- [TanStack Router](https://tanstack.com/router/) - Type-safe file-based routing.
- [TanStack Form](https://tanstack.com/form/) - Type-safe form handling with server form support.
- [TanStack Query](https://tanstack.com/query/) - To manage external server query state.
- [Better Auth](https://www.better-auth.com/) - Auth with email/password, admin plugin, database rate limiting.
- [Prisma](https://prisma.io) ORM + PostgreSQL.
- [Nitro](https://nitro.unjs.io/) - Deployment-agnostic server output (node/vercel/netlify/cloudflare).

### Dev tools:

- [pnpm](https://pnpm.io) - Fast, disk space efficient package manager.
- [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) for code linting, and [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html) for code formatting
- [Vite](https://vitejs.dev/) - The blazing fast frontend build tool.
- [Vitest](https://vitest.dev/) for unit tests with [Testcontainers](https://testcontainers.com/) spinning up a real PostgreSQL for integration tests.
- [Husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/lint-staged/lint-staged) + [lint-prepush](https://github.com/samhwang/lint-prepush) git hooks.

## Getting started

1. **Start the database**

   ```shell
   docker compose up -d
   ```

2. **Install dependencies**

   ```shell
   pnpm install
   ```

3. **Configure environment**

   ```shell
   cp .env.sample .env
   ```

4. **Set up the database**

   ```shell
   pnpm run prisma:migrate:dev
   ```

5. **Start the dev server**

   ```shell
   pnpm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

```shell
pnpm run dev
pnpm run build
pnpm run test
pnpm run lint
pnpm run typecheck
pnpm run prisma:studio
pnpm run auth:secret
```

## Project Structure

```
├── prisma/               # Database schema (Better Auth models)
├── src/
│   ├── auth/             # Better Auth server/client, form hooks
│   ├── routes/           # TanStack Start file-based routes (+ API routes under /api)
│   ├── config/           # Env validation (zod), site settings
│   └── database/         # Prisma client
└── docker-compose.yml    # PostgreSQL for local dev
```

## Deployment

Build once, deploy anywhere:

- `DEPLOYMENT_ENV=node` (default) - `nitro` node-server preset, run with `pnpm start`
- `DEPLOYMENT_ENV=vercel` - vercel preset
- `DEPLOYMENT_ENV=netlify` - requires `netlify.toml`, see [@netlify/vite-plugin-tanstack-start](https://github.com/netlify/vite-plugin-tanstack-start)
- `DEPLOYMENT_ENV=cloudflare` - requires `wrangler.toml`, see `wrangler.toml.sample`

## Learn More

- [TanStack Start docs](https://tanstack.com/start/latest)
- [Better Auth docs](https://www.better-auth.com/docs/introduction)
- [Prisma docs](https://www.prisma.io/docs)
