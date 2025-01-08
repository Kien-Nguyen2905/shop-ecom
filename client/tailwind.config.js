/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        darkGrey: '#777',
        primary: '#fcb941',
        danger: '#FF4D4F',
        bBottom: '#ebebeb',
        backPrimary: '#1A1A1A',
        textGrey: '#666666',
        borderGrey: '#f4f4f4',
      },
      backgroundColor: {
        bgWhite: 'fff',
        bgPrimary: '#fcb941',
        bgInPut: '#fafafa',
      },
      fontFamily: {
        PpLight: 'PoppinsLight',
        PpMd: 'PoppinsMedium',
        PpBold: 'PoppinsBold',
        PpExtraBold: 'PoppinsExLight',
      },
    },
  },
  plugins: [],
};
