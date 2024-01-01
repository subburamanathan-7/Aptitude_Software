/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    screens:{
      sm:'360px',
      tablet:'960px',
      desktop:'1248px',

      sm:'640px',
      md:'768px',	      
      lg:'1024px',	
      xl:'1280px',	
      '2xl':'1536px'
    },
    height: {
      sm: '713px',
      md: '1000px',
     
    },
    colors:{
        white:'#FFFFFF',
        red:'#fc6262',
        green:'#50C878'
      },
    extend: {
      fontFamily:{
        poppins:['Poppins'],
        raleway: ['Raleway'],
        inconsolata: ['Inconsolata'],
      }

    },
  },
  plugins: [],
}

