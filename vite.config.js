import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		strictPort: true, // Ensures Vite uses the same port every time, helpful for debugging
		fs: {
			strict: false // Allows Vite to access files outside the root directory if needed
		}
	},
	preview: {
		port: 5000 // Port used when running `vite preview`
	},
	resolve: {
		alias: {
			'@': '/src' // Optional: Aliases `@` to `/src` for cleaner imports
		}
	}
});
