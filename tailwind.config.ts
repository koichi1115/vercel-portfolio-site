import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Atlassian Design System Color Palette
        primary: {
          50: '#DEEBFF',
          100: '#B3D4FF',
          200: '#4C9AFF',
          300: '#2684FF',
          400: '#0065FF',
          500: '#0052CC',
          600: '#0747A6',
          700: '#0B3D91',
        },
        neutral: {
          0: '#FFFFFF',
          10: '#FAFBFC',
          20: '#F4F5F7',
          30: '#EBECF0',
          40: '#DFE1E6',
          50: '#C1C7D0',
          100: '#B3BAC5',
          200: '#A5ADBA',
          300: '#8993A4',
          400: '#7A869A',
          500: '#6B778C',
          600: '#5E6C84',
          700: '#505F79',
          800: '#42526E',
          900: '#253858',
          1000: '#091E42',
        },
        'dark-neutral': {
          800: '#161B22',
          900: '#0D1117',
        },
        success: {
          50: '#E3FCEF',
          400: '#00875A',
          500: '#006644',
        },
        warning: {
          50: '#FFFAE6',
          400: '#FF991F',
          500: '#FF8B00',
        },
        error: {
          50: '#FFEBE6',
          400: '#DE350B',
          500: '#BF2600',
        },
        info: {
          50: '#E6FCFF',
          400: '#00B8D9',
          500: '#00A3BF',
        },
        // Legacy compatibility
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          '"Fira Sans"',
          '"Droid Sans"',
          '"Helvetica Neue"',
          'sans-serif',
        ],
        mono: [
          '"SF Mono"',
          'Monaco',
          'Inconsolata',
          '"Fira Code"',
          '"Droid Sans Mono"',
          '"Courier New"',
          'monospace',
        ],
      },
      fontSize: {
        xs: ['0.6875rem', { lineHeight: '1.4' }],    // 11px
        sm: ['0.75rem', { lineHeight: '1.4' }],      // 12px
        base: ['0.875rem', { lineHeight: '1.6' }],   // 14px
        lg: ['1rem', { lineHeight: '1.6' }],         // 16px
        xl: ['1.25rem', { lineHeight: '1.4' }],      // 20px
        '2xl': ['1.5rem', { lineHeight: '1.4' }],    // 24px
        '3xl': ['1.8125rem', { lineHeight: '1.2' }], // 29px
        '4xl': ['2.1875rem', { lineHeight: '1.2' }], // 35px
        '5xl': ['2.625rem', { lineHeight: '1.2' }],  // 42px
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      spacing: {
        // 8px grid system
        0.5: '0.125rem',  // 2px
        1: '0.25rem',     // 4px
        2: '0.5rem',      // 8px
        3: '0.75rem',     // 12px
        4: '1rem',        // 16px
        5: '1.25rem',     // 20px
        6: '1.5rem',      // 24px
        8: '2rem',        // 32px
        10: '2.5rem',     // 40px
        12: '3rem',       // 48px
        16: '4rem',       // 64px
        20: '5rem',       // 80px
        24: '6rem',       // 96px
      },
      boxShadow: {
        sm: '0 1px 1px rgba(0, 0, 0, 0.1)',
        md: '0 4px 8px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)',
        lg: '0 8px 16px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08)',
        xl: '0 12px 24px rgba(0, 0, 0, 0.15), 0 6px 12px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        sm: '0.125rem',   // 2px
        md: '0.1875rem',  // 3px
        lg: '0.375rem',   // 6px
        xl: '0.5rem',     // 8px
      },
      transitionDuration: {
        fast: '75ms',
        DEFAULT: '150ms',
        slow: '300ms',
        slower: '500ms',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
