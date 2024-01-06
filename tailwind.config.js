import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,jsx,js,ts}'],
	theme: {
		extend: {
			fontFamily: {
				ephesis: ['Ephesis', 'cursive'],
			},
		},
	},
	plugins: [daisyui],
}
