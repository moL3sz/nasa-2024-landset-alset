import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import {viteStaticCopy} from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig({

	plugins: [react(),
		viteStaticCopy({
			targets: [
				{src: 'node_modules/three/build/three.min.js', dest: 'resources'},
				{src: 'src/resources/', dest: 'resources/'}
			]
		})],
	build: {}
})
