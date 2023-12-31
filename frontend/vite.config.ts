import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import env from "vite-plugin-env-compatible";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        open: false,
        proxy: {
            '/api' : {
                target: 'http://localhost:8000'
            }
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@products': path.resolve(__dirname, './src/products'),
            '@model': path.resolve(__dirname, './src/products/model'),
            "@component": path.resolve(__dirname, "./src/products/component"),
            "@icon": path.resolve(__dirname, "./src/products/icon"),
            '@repository': path.resolve(__dirname, './src/products/repository'),
            '@redux': path.resolve(__dirname, './src/products/redux'),
            '@page': path.resolve(__dirname, './src/products/page'),
            '@tests': path.resolve(__dirname, './src/tests')
        }
    },
    plugins: [
        react(),
        env({ prefix: "VITE",  mountedPath: "process.env" })
    ],
})