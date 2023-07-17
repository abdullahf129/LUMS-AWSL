import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: "./",
  //set the build directory to the backend's build folder
  build: {
   outDir: "../backend/dist"
  }

})
