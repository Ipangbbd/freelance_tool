import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'zustand', 'clsx', 'tailwind-merge', 'lucide-react'],
          exportDocs: ['docx', 'file-saver'],
          exportPdf: ['jspdf', 'html2canvas'],
        },
      },
    },
  },
})

