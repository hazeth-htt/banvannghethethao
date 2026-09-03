/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bvntt: {
          bg: '#07040d',
          surface: '#0d0919',
          'surface-2': '#12102a',
          purple: '#6A00FF',
          'purple-dim': '#330177',
          'purple-deep': '#1a0040',
          lilac: '#D6B9FF',
          cream: '#f5f2ee',
          muted: 'rgba(245,242,238,0.55)',
          border: 'rgba(245,242,238,0.08)',
          'border-md': 'rgba(245,242,238,0.15)',
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"League Gothic"', 'sans-serif'],
        editorial: ['"League Gothic"', 'sans-serif'],
      },
      letterSpacing: {
        'tighter-2': '-0.06em',
        'tight-2': '-0.04em',
        'wide-2': '0.14em',
        'wide-3': '0.22em',
      },
      lineHeight: {
        'none-2': '0.88',
        'none-3': '0.92',
      },
      animation: {
        'marquee': 'marquee 50s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      }
    },
  },
  plugins: [],
}
