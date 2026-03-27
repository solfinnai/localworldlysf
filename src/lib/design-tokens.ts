export const colors = {
  primary: '#0A1628',
  accent: '#E8A838',
  cream: '#FAF7F2',
  background: '#F2F0ED',
  text: '#1A1A1A',
  muted: '#6B7280',
  success: '#22C55E',
  white: '#FFFFFF',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
} as const;

export const spacing = {
  section: '5rem',
  sectionLg: '6.25rem',
  hero: { minHeight: '520px', height: '65vh' },
} as const;

export const typography = {
  fontDisplay: "'Playfair Display', Georgia, serif",
  fontBody: "'Source Serif 4', Georgia, serif",
  fontUI: "'Inter', system-ui, sans-serif",
  
  scale: {
    h1: 'clamp(2.5rem, 5vw, 4rem)',
    h2: 'clamp(1.75rem, 3vw, 2.5rem)',
    h3: 'clamp(1.25rem, 2vw, 1.75rem)',
    body: 'clamp(1.125rem, 2vw, 1.25rem)',
    intro: 'clamp(1.25rem, 2.5vw, 1.5rem)',
    caption: '0.875rem',
    pullquote: 'clamp(1.5rem, 3vw, 2.25rem)',
  },
} as const;

export const radius = {
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  full: '9999px',
} as const;

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
  card: '0 2px 12px rgba(0, 0, 0, 0.06)',
  cardHover: '0 10px 40px rgba(0, 0, 0, 0.12)',
} as const;

export const transitions = {
  fast: '150ms',
  normal: '200ms',
  slow: '300ms',
} as const;

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
} as const;

export const tokens = {
  colors,
  spacing,
  typography,
  radius,
  shadows,
  transitions,
  breakpoints,
} as const;

export type Tokens = typeof tokens;
