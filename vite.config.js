// vite.config.js
import {defineConfig} from 'vite';
import path from 'path';

export default defineConfig({
    base: '/starter/',
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, './index.html'),
                about: path.resolve(__dirname, './about.html'),
                // Добавьте другие страницы по аналогии
            }
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
});