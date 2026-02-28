/** @type {import('tailwindcss').Config} */
const withOpacityValue = (variable) => ({ opacityValue } = {}) => {
  if (opacityValue === undefined) {
    return `rgb(var(${variable}))`
  }
  return `rgb(var(${variable}) / ${opacityValue})`
}

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: withOpacityValue('--color-primary-rgb'),
        secondary: withOpacityValue('--color-secondary-rgb'),
        accent: withOpacityValue('--color-accent-rgb'),
        background: withOpacityValue('--color-background-rgb'),
        foreground: withOpacityValue('--color-foreground-rgb'),
        muted: withOpacityValue('--color-muted-rgb'),
        success: withOpacityValue('--color-success-rgb'),
        warning: withOpacityValue('--color-warning-rgb'),
        error: withOpacityValue('--color-error-rgb'),
        info: withOpacityValue('--color-info-rgb'),
        surface: withOpacityValue('--color-surface-rgb'),
        'surface-hover': withOpacityValue('--color-surface-hover-rgb'),
        border: withOpacityValue('--color-border-rgb'),
        'border-strong': withOpacityValue('--color-border-strong-rgb'),
      },
      fontFamily: {
        display: 'var(--font-display)',
        body: 'var(--font-body)',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
}
