import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		preprocess({
			postcss: true
		})
	],

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			fallback: 'index.html',
			strict: true
		}),
		paths: {
			// configurar 'base' si la app no va a estar en el directorio raiz del dominio
			// base: '/doruscom_mayorista/build', //este caso es para localhost
		},
		alias: {
			'@routes': './src/routes',
			'@components': './src/lib/components',
			'@utils': './src/lib/utils',
			'@types': './src/lib/types'
		}
	}
};

export default config;
