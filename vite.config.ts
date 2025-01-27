import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { networkInterfaces } from 'os'
import pmf from 'postcss-mobile-forever'

// 获取本机 IP 地址
const getLocalIP = () => {
  const nets = networkInterfaces()
  for (const name of Object.keys(nets ?? {})) {
    const interfaces = nets[name];
    if (interfaces) {
      for (const net of interfaces) {
        if (net.family === 'IPv4' && !net.internal) {
          return net.address;
        }
      }
    }
  }
  return 'localhost'
}
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: (assetInfo: any) => {
          let extType = assetInfo.name.split(".").at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = "images";
          }
          if (/mp3|wav|ogg|ttf|otf|woff|woff2/i.test(extType)) {
            extType = "resource";
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        // 打包后的文件名
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            // React 相关依赖
            if (/react|@types\/react|react-dom|react-router-dom/.test(id)) {
              return 'react-vendor';
            }
            // 动画相关依赖
            if (/gsap|framer-motion/.test(id)) {
              return 'animation-vendor';
            }
            // 状态管理相关依赖
            if (/zustand|immer/.test(id)) {
              return 'store-vendor';
            }
            // 其他第三方依赖
            return 'vendor';
          }
        },
      },
    },
    assetsInlineLimit: 4096,
  },
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@layout': '/src/layouts',
      '@store': '/src/store',
      '@hooks': '/src/hooks',
      '@utils': '/src/utils',
      '@styles': '/src/styles',
      '@services': '/src/services',
      '@assets': '/src/assets',
      '@routers': '/src/routers'
    }
  },
  server: {
    host: true,
    open: `http://${getLocalIP()}:5173`,
    port: 5173,
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[name]__[local]__[hash:base64:5]'
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variables.scss" as *;`
      }
    },
    devSourcemap: true,
    postcss: {
      plugins: [
        pmf({
          appSelector: "#root",
						viewportWidth: 750,
						maxDisplayWidth: 450,
						exclude: /src\/styles\/.*/,
        })
      ]
    }
  }
})
