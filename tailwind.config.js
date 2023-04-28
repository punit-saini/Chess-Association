/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'my-yellow': '#f2ff93',
        'my-black': '#222222',
        'my-grey': '#e8e8e8',
        'my-green': '#587d71',
      },
    },
    // fontFamily: {
    //   'nunito': ['Nunito', 'Helvetica', 'Arial', 'sans-serif']
    // }
  },
  plugins: [
    require("flowbite/plugin"),
    require('@tailwindcss/forms'),
  ],
  
}