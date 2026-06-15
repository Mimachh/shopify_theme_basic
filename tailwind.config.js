/** @type {import('tailwindcss').Config} */

// Spacing scale driven by the "Spacing density" theme setting
// (--space-unit, defined in snippets/css-variables.liquid).
// Every spacing-based utility (p-*, m-*, gap-*, w-*, h-*, ...) becomes a
// multiple of --space-unit, so the whole layout responds to that setting.
const spacingSteps = [
  0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96,
];

const spacing = { px: '1px', 0: '0px' };
spacingSteps.forEach((step) => {
  spacing[step] = `calc(var(--space-unit) * ${step})`;
});

// Font size scale driven by the "Font scale" theme setting (--font-scale).
const fontSizeBase = {
  xs: ['0.75rem', '1rem'],
  sm: ['0.875rem', '1.25rem'],
  base: ['1rem', '1.5rem'],
  lg: ['1.125rem', '1.75rem'],
  xl: ['1.25rem', '1.75rem'],
  '2xl': ['1.5rem', '2rem'],
  '3xl': ['1.875rem', '2.25rem'],
  '4xl': ['2.25rem', '2.5rem'],
  '5xl': ['3rem', '1'],
  '6xl': ['3.75rem', '1'],
  '7xl': ['4.5rem', '1'],
  '8xl': ['6rem', '1'],
  '9xl': ['8rem', '1'],
};

const fontSize = Object.fromEntries(
  Object.entries(fontSizeBase).map(([key, [size, lineHeight]]) => [
    key,
    [`calc(var(--font-scale) * ${size})`, { lineHeight }],
  ])
);

module.exports = {
  content: [
    './layout/**/*.liquid',
    './sections/**/*.liquid',
    './snippets/**/*.liquid',
    './templates/**/*.liquid',
    './assets/*.js',
  ],
  theme: {
    spacing,
    fontSize,
    extend: {
      colors: {
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        text: 'var(--color-text)',
      },
      fontFamily: {
        heading: 'var(--font-heading)',
        body: 'var(--font-body)',
      },
    },
  },
  plugins: [],
};
