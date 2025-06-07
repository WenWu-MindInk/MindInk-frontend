import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import VueJsx from '@vitejs/plugin-vue-jsx'

// 获取 __filename 的 ESM 写法
const __filename = fileURLToPath(import.meta.url)
// 获取 __dirname 的 ESM 写法
const __dirname = dirname(fileURLToPath(import.meta.url))



export default defineConfig({
  plugins: [VueJsx(),vue()],
  // 设置别名
  resolve: {
    alias: [
      {
        // 设置别名， '@' 指向 'src' 目录
        find: "@",
        replacement: path.resolve(__dirname, './src')
      },
    ]
  },
  devServer: {
      proxy: {
        '/api': {
          target: 'http://192.168.1.100:8000',  // Django服务器的IP和端口
          changeOrigin: true,
        }
      }
    }
})
