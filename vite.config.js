import { defineConfig } from 'vite'
import basicSsl from '@vitejs/plugin-basic-ssl'
import os from 'os'

// Automatically get the local network IP address
function getNetworkIp() {
  const interfaces = os.networkInterfaces()
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Find IPv4, and not loopback address (127.0.0.1)
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address
      }
    }
  }
  return 'localhost'
}

const networkIp = getNetworkIp()

export default defineConfig({
  plugins: [basicSsl()],
  server: {
    https: true,
    host: true, // Allow local network access
    port: 5173,
    hmr: {
      host: networkIp, // Dynamic set HMR connection address
      protocol: 'wss',
    },
  },
})