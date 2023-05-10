import formsPlugin from '@tailwindcss/forms';
import typographyPlugin from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import { fontFamily, spacing } from 'tailwindcss/defaultTheme';

/**
 * @todo verify colors for categories
 */
import { app, paletteBrandBlue, paletteBrandGray } from './src/styles/colors.json';

const TOP_NAV_HEIGHT = '48px';
const SIDE_NAV_WIDTH = '360px';
const CHAT_MAX_WIDTH = '840px';

const converPaletteToTailwind = (palette) => {
  const name = palette.name;
  const colors = palette.colors;

  return Object.entries(colors).reduce((acc, [key, color]) => {
    return {
      ...acc,
      [`${name}-${key}`]: color,
    };
  }, {});
};

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/ds/**/*.{js,ts,jsx,tsx}',
    './src/screens/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/atoms/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'chat-box': '0 2px 4px rgb(0 0 0 / 50%)',
      },
      colors: {
        ...converPaletteToTailwind(paletteBrandGray),
        ...converPaletteToTailwind(paletteBrandBlue),
        'brand-primary': app.colors['brand-primary'],
        'brand-secondary': app.colors['brand-secondary'],
        'brand-accent': app.colors['brand-accent'],
        'text-primary-lightmode': paletteBrandGray.colors['900'],
        'text-secondary-lightmode': paletteBrandGray.colors['700'],
        'text-primary-darkmode': paletteBrandGray.colors['100'],
        'text-secondary-darkmode': paletteBrandGray.colors['300'],
        'bg-primary-lightmode': paletteBrandGray.colors['0'],
        'bg-primary-darkmode': paletteBrandGray.colors['900'],
        'user-chat-message': paletteBrandBlue.colors['100'],
        'chat-bar': paletteBrandBlue.colors['100'],
        black: app.colors['black'],
        white: app.colors['white'],
        positive: app.colors['positive'],
        negative: app.colors['negative'],
        warning: app.colors['warning'],
        'border-primary-lightmode': '#E5E7EB',
      },
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
      },
      screens: {
        'lp-hero': '1600px',
      },
      spacing: {
        'top-nav': TOP_NAV_HEIGHT,
        'gutter-base': spacing[6],
        'chat-container-gutter': '1rem',
      },
      maxWidth: {
        'chat-container': CHAT_MAX_WIDTH,
      },
      width: {
        'side-nav': SIDE_NAV_WIDTH,
      },
      zIndex: {
        60: '60',
        70: '70',
        80: '80',
        90: '90',
        100: '100',
      },
    },
  },
  plugins: [formsPlugin, typographyPlugin],
  safelist: [],
} satisfies Config;
