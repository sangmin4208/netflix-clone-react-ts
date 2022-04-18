import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://sangmin4208.github.io/netflix-clone-react-ts/',
  plugins: [react()],
})
