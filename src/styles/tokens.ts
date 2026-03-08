export const tokens = {
    colors: {
        primary: '#E0AD08',
        primaryStrong: '#C99800',
        primarySoft: '#F2D05E',
        bg: '#0E0E0E',
        surface: 'rgba(14, 14, 14, 0.48)',
        text: '#FFFFFF',
        textMuted: 'rgba(255,255,255,0.88)',
        border: 'rgba(255,255,255,0.85)',
        shadow: 'rgba(0,0,0,0.24)',
    },
    radius: {
        pill: '999px',
        xl: '28px',
    },
    spacing: {
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        xxl: '48px',
    },
    typography: {
        titleClamp: 'clamp(2.5rem, 6vw, 5.5rem)',
        subtitleClamp: 'clamp(1rem, 2vw, 1.375rem)',
        bodyClamp: 'clamp(1rem, 1.6vw, 1.25rem)',
    },
} as const;

export type DesignTokens = typeof tokens;