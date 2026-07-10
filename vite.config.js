import { resolve } from 'path'

export default {
  server: {
    allowedHosts: ['.loca.lt'],
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        queEs: resolve(__dirname, 'que-es.html'),
        horarios: resolve(__dirname, 'horarios.html'),
        servicios: resolve(__dirname, 'servicios.html'),
      },
    },
  },
}
