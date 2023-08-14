import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()]
})

module.exports = {
  assets: [
    path.resolve(__dirname, '../static/img/bohemian.jpg'),
    path.resolve(__dirname, '../static/img/renegade.jpg'),
    path.resolve(__dirname, '../static/img/BLANK.jpg'),
    path.resolve(__dirname, '../static/img/runandhide.jpg')

  ]
}
