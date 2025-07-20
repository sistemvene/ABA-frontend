import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'


export default defineConfig({

  plugins: [react()],

  root: '.',     // la raíz del proyecto (index.html aquí)

  publicDir: 'public', // solo para assets estáticos

})

