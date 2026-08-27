import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'react/jsx-runtime',
    'class-variance-authority',
    'clsx',
    'tailwind-merge',
  ],
  esbuildOptions(options) {
    options.jsx = 'automatic'
  },
  outExtension({ format }) {
    return { js: format === 'cjs' ? '.cjs' : '.js' }
  },
})
