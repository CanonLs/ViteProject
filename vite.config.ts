import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { networkInterfaces } from 'os'

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
  server: {
    host: true,
    open: `http://${getLocalIP()}:5173`,
    port: 5173,
  }
})
