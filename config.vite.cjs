import path from 'path'
import { defineConfig } from 'vite'

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, 'public/layouts/default/assets/index.css'),
      output: {
        dir: './bundle',
        entryFileNames: '[name].[hash].css'
      }
    }
  }
})
