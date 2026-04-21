/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f7ff',
          100: '#e8edff',
          500: '#375dfb',
          600: '#284bdb',
          700: '#1e3fae'
        }
      },
      boxShadow: {
        panel: '0 12px 32px rgba(15, 23, 42, 0.08)'
      }
    }
  },
  plugins: []
};
