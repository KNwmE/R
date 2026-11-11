/** Spacing is locked to the landing-page-design skill tokens (B2). */
const extra = { 5: '20px', 11: '44px' };
const tall = { 56: '224px', 72: '288px', 80: '320px', 96: '384px' }; // 3D canvas heights
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    spacing: {
      px: '1px', 0: '0', 0.5: '2px', 1: '4px', 2: '8px', 3: '12px', 4: '16px',
      6: '24px', 8: '32px', 10: '40px', 12: '48px', 16: '64px', 20: '80px', 24: '96px',
    },
    extend: {
      width: extra, height: { ...extra, ...tall }, size: extra, minHeight: extra,
      maxWidth: { hero: '680px' },
      fontFamily: { sans: ['Manrope', 'system-ui', 'sans-serif'] },
      colors: {
        bg: 'var(--bg)', surface: 'var(--surface)', 'surface-2': 'var(--surface-2)', line: 'var(--line)',
        fg: 'var(--text)', 'fg-2': 'var(--text-2)', 'fg-3': 'var(--text-3)',
        accent: 'var(--accent)', 'accent-strong': 'var(--accent-strong)', 'accent-deep': 'var(--accent-deep)', 'on-accent': 'var(--on-accent)',
        paper: 'var(--paper)', 'paper-2': 'var(--paper-2)', ink: 'var(--ink)', 'ink-2': 'var(--ink-2)', 'ink-3': 'var(--ink-3)',
        'paper-line': 'var(--paper-line)', 'accent-paper': 'var(--accent-on-paper)',
      },
      transitionTimingFunction: { DEFAULT: 'cubic-bezier(0.22, 1, 0.36, 1)', out: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      transitionDuration: { DEFAULT: '300ms' },
      keyframes: { marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } } },
      animation: { marquee: 'marquee 40s linear infinite' },
    },
  },
  plugins: [],
};
