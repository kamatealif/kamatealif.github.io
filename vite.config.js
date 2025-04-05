import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	optimizeDeps: {
		exclude: [
			'@tailwindcss/vite',
			'tailwindcss',
			'@sveltejs/kit',
			'svelte',
			'@tailwindcss/typography',
			'@tailwindcss/forms'
		],
		// Force include specific deps that might be causing issues
		include: []
	},
	// Clear cache if optimization issues persist
	server: {
		fs: {
			strict: false
		}
	}
});
