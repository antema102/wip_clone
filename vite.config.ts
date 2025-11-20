import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mkcert({
      domains: ['localhost'], // Add more domains if needed
      certificateFile: './localhost.pem', // Path to your SSL certificate
      privateKeyFile: './localhost-key.pem' // Path to your private key
    })
  ],
  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
  },
});
