import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
    // 모든 IP 주소에서의 접속을 허용합니다.
    host: '0.0.0.0' 
  }
})
