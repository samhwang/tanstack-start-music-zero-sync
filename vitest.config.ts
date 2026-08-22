import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'node',
    globalSetup: ['./test/globalSetup.ts'],
    setupFiles: ['./test/per-file-db.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/routeTree.gen.ts',
        'test/**',
        'src/**/*.test.{ts,tsx}',
        'src/**/generated/**',
        'src/auth/client.ts',
        'src/auth/server.ts',
        'src/auth/server/lib.ts',
        'src/config/server/getSiteName.ts',
        'src/database/lib/client.ts',
        'src/routes/**/*.tsx',
        'src/routes/api/**',
      ],
    },
  },
});
