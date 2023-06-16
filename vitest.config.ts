import { defineConfig } from 'vitest/config'
import viteReact from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [viteReact()],
  test: {
    include: ['./src/**/*.spec.ts'],
    globals: true
  },
})

