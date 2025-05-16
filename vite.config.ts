import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],

	preview: {
		host: '0.0.0.0', // Allow external access if needed
		port: 4173,      // Use the port your server runs on
		allowedHosts: true
	},
});
