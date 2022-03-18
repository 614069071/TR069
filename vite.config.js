import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import viteCompression from 'vite-plugin-compression'
import viteImagemin from 'vite-plugin-imagemin'

// import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '/images': 'src/assets/images',
      router: resolve(__dirname, 'src/router'),
      views: resolve(__dirname, 'src/views'),
      components: resolve(__dirname, 'src/components'),
      utils: resolve(__dirname, 'src/utils'),
      '@': resolve(__dirname, 'src'),
      assets: resolve(__dirname, 'src/assets')
    }
  },
  plugins: [
    vue(),
    Components({
      resolvers: [
        ArcoResolver()
      ]
    }),
    viteCompression({
      //生成压缩包gz
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 50,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
  ],

  // 引入全局scss文件
  css: {
    preprocessorOptions: {
      // scss: {
      //     additionalData: '@import "./src/styles/variables";',
      // },
    },
  },
  build: {
    terserOptions: {
      compress: {
        //生产环境时移除console
        drop_console: true,
        drop_debugger: true,
      },
    },
    // 取消计算文件大小，加快打包速度
    reportCompressedSize: false,
    sourcemap: true,
    // assetsDir: 'static/img',
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]',
      },
    },
  },
  server: {
    // host: '0.0.0.0',
    port: 3001,
    proxy: {
      '/api': {
        // target: 'http://112.74.171.82:8080', // 线上服务
        target: 'http://192.168.6.163:9000/', // 明恺本地服务,此处走网关
        target: 'http://192.168.6.163:8891/', // 明恺本地服务
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  }
})
