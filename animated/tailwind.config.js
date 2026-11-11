/** Spacing is locked to the landing-page-design skill tokens (B2). */
const extra = { 5: '20px', 11: '44px' };
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    spacing: {
      px: '1px', 0: '0', 0.5: '2px', 1: '4px', 2: '8px', 3: '12px', 4: '16px',
      6: '24px', 8: '32px', 10: '40px', 12: '48px', 16: '64px', 20: '80px', 24: '96px',
    },
    extend: {
      width: extra, height: extra, size: extra, minHeight: extra,
      maxWidth: { hero: '680px' },
      fontFamily: { sans: ['Manrope', 'system-ui', 'sans-serif'] },
      colors: {
        bg: 'var(--bg)', surface: 'var(--surface)', 'surface-2': 'var(--surface-2)', deep: 'var(--deep)',
        line: 'var(--line)', ink: 'var(--text)', 'ink-2': 'var(--text-2)', 'ink-3': 'var(--text-3)',
        gold: 'var(--gold)', 'gold-hover': 'var(--gold-hover)', 'on-gold': 'var(--on-gold)', 'gold-soft': 'var(--gold-soft)',
      },
      transitionTimingFunction: { DEFAULT: 'cubic-bezier(0.22, 1, 0.36, 1)', out: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      transitionDuration: { DEFAULT: '300ms' },
    },
  },
  plugins: [],
};
