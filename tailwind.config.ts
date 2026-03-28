import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#102033',
        mist: '#eef3f7',
        sky: '#d9edf7',
        slate: '#5e738a',
        brass: '#c59f43',
        pine: '#1f5f54',
        coral: '#df7a5c',
      },
      boxShadow: {
        soft: '0 20px 60px rgba(16, 32, 51, 0.10)',
        panel: '0 18px 45px rgba(21, 45, 76, 0.08)',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui'],
        display: ['"Fraunces"', 'ui-serif', 'Georgia'],
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(16,32,51,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(16,32,51,0.05) 1px, transparent 1px)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        rise: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        rise: 'rise 0.5s ease-out both',
      },
    },
  },
  plugins: [],
} satisfies Config;
