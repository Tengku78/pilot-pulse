import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class', // optional but recommended for dark theme consistency
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    // Remove './pages/**/*' if not using Pages Router anymore
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        aviation: {
          blue: {
            DEFAULT: '#3B82F6',
            light: '#60A5FA',
            dark: '#2563EB',
          },
          navy: {
            DEFAULT: '#0F172A',
            light: '#1E293B',
            dark: '#020617',
          },
        },
        glass: {
          DEFAULT: 'rgba(255, 255, 255, 0.05)', // common subtle glass bg
          medium: 'rgba(255, 255, 255, 0.08)',
          strong: 'rgba(255, 255, 255, 0.12)',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backdropBlur: {
        xs: '2px',
        '3xs': '1px', // extra subtle if needed
      },
      boxShadow: {
        'glass-sm': '0 4px 30px rgba(0, 0, 0, 0.1)',
        'glass-md': '0 8px 32px rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        '2.5xl': '20px', // common for glass cards
        '3xl': '24px',
      },
    },
  },
  plugins: [
    // Optional: only if you want ready-made glass components
    // require('@casoon/tailwindcss-glass'), // npm install @casoon/tailwindcss-glass
    // or older one: require('tailwindcss-filters') // but not needed anymore
  ],
};

export default config;