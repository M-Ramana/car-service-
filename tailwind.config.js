/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '375px',
      },
      colors: {
        background: {
          DEFAULT: '#ffffff',
          dark: '#040404',
          graphite: '#191919',
          secondary: '#f8f9fa',
          card: '#ffffff',
          surface: '#f1f3f5',
          'card-hover': '#f8f9fa',
          'off-white': '#f8f9fa',
          'light': '#f1f3f5',
        },
        border: {
          DEFAULT: '#e5e7eb',
          light: '#f0f0f0',
          subtle: '#f8f9fa',
          accent: 'rgba(227, 27, 35, 0.4)',
          gold: 'rgba(245, 185, 0, 0.3)',
        },
        accent: {
          DEFAULT: '#E31B23',
          hover: '#c0151c',
          dark: '#B5121B',
          glow: 'rgba(227, 27, 35, 0.2)',
          subtle: 'rgba(227, 27, 35, 0.08)',
        },
        silver: {
          DEFAULT: '#6b7280',
          light: '#9ca3af',
          dark: '#4b5563',
          subtle: '#f3f4f6',
        },
        gold: {
          DEFAULT: '#F5B900',
          light: '#FFD033',
          dark: '#C79600',
          glow: 'rgba(245, 185, 0, 0.25)',
        },
        graphite: '#191919',
        'racing-red': '#E31B23',
        'deep-red': '#B5121B',
        'metallic-silver': '#6b7280',
        'automotive-gold': '#F5B900',
        'deep-black': '#111111',
        'dark-charcoal': '#242424',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        heading: ['Manrope', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        display: ['Manrope', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Mono"', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },
      boxShadow: {
        'racing-glow': '0 0 35px -5px rgba(227, 27, 35, 0.55)',
        'racing-sm': '0 0 20px -3px rgba(227, 27, 35, 0.4)',
        'racing-xs': '0 0 10px -2px rgba(227, 27, 35, 0.3)',
        'gold-sm': '0 0 15px -3px rgba(245, 185, 0, 0.35)',
        'dark-card': '0 10px 30px -10px rgba(0, 0, 0, 0.9)',
        'dark-xl': '0 25px 50px -12px rgba(0, 0, 0, 0.95)',
        'inset-red': 'inset 0 1px 0 rgba(227, 27, 35, 0.4)',
        'inset-gold': 'inset 0 1px 0 rgba(245, 185, 0, 0.3)',
        'card-hover-red': '0 8px 32px -4px rgba(227, 27, 35, 0.25)',
      },
      backgroundImage: {
        'radial-red': 'radial-gradient(circle at 50% 0%, rgba(227, 27, 35, 0.15) 0%, rgba(181, 18, 27, 0.05) 45%, transparent 70%)',
        'radial-hero': 'radial-gradient(circle at 40% 40%, rgba(227, 27, 35, 0.2) 0%, rgba(181, 18, 27, 0.08) 40%, rgba(8, 8, 8, 0) 75%)',
        'radial-ambient': 'radial-gradient(circle at 50% 0%, rgba(227, 27, 35, 0.12) 0%, rgba(25, 25, 25, 0) 65%)',
        'gradient-dark': 'linear-gradient(180deg, rgba(8,8,8,0) 0%, rgba(8,8,8,0.9) 70%, #080808 100%)',
        'gradient-left': 'linear-gradient(90deg, #080808 0%, rgba(8,8,8,0.85) 50%, transparent 100%)',
        'gradient-red-dark': 'linear-gradient(135deg, #E31B23 0%, #B5121B 100%)',
        'gradient-dark-card': 'linear-gradient(180deg, rgba(25,25,25,0) 0%, rgba(25,25,25,0.95) 100%)',
        'carbon-pattern': `
          linear-gradient(0deg, rgba(255,255,255,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
        `,
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-red': 'pulse-red 2s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'slide-up': 'slide-up 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'float': 'float-car 4s ease-in-out infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-red': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 15px rgba(227,27,35,0.3)' },
          '50%': { opacity: '0.7', boxShadow: '0 0 25px rgba(227,27,35,0.6)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'float-car': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      transitionTimingFunction: {
        racing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
}
