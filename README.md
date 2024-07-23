# Placeholder Posts

This is a simple React SPA.

```sh
// Install deps
pnpm i

// Run dev
pnpm dev

// Build
pnpm build

// Run e2e tests (you need to build first before running)
pnpm test
```

## Environment Variables

There's only one public env variable used:

```ini
VITE_API_URL=https://jsonplaceholder.typicode.com
```

# Stack

## Data Fetching

`tanstack-query` aka React Query is used to handle request state. `fetch` api is used to make requests to JSONPlaceholder.
`zod` is used to ensure type-safe data, since JSONPlaceholder does not provide types (no OpenApi spec / TypeScript client) (at least not officially)

## Styling

`tailwindcss` is used as css framework - it's great for quick demo projects

## e2e testing 

UI tests are written in `playwright`