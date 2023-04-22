const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],

	theme: {
		extend: {
			fontFamily: {
				sans: ['"Open Sans"', 'sans-serif']
			},
			colors: {
				primary: '#FF355E',
				secondary: '#FF355E',
				muted: '#E9ECEF',
				light: '#F4F4F5',
				alternative: '#515164',
				dark: '#515164'
			}
		}
	},

	plugins: [require('flowbite/plugin')]
};

module.exports = config;
