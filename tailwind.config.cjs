const config = {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				sans: ['"Open Sans"', 'sans-serif']
			},
			colors: {
				primary: '#99BFAA', // verde oscuro
				secondary: '#5C868D', // azul
				muted: '#C8D6CA', // verde
				light: '#E7F5DE', // verde claro
				alternative: '#5C3D46', // marron
				dark: '#211915' // negro
			}
		}
	},

	plugins: [require('flowbite/plugin')]
};

module.exports = config;
