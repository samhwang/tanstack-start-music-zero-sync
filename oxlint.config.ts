import { defineConfig } from 'oxlint';

export default defineConfig({
  plugins: ['react', 'typescript', 'jsx-a11y'],
  options: {
    typeAware: true,
  },
  rules: {},
  ignorePatterns: [
    'node_modules',
    'dist',
    '.output',
    'coverage',
    'generated',
    '.content-collections',
    '.claude',
    'base',
    '.playwright',
    'src/routeTree.gen.ts',
    'src/**/__snapshots__',
  ],
});
