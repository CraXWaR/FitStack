/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                background: {
                    main: 'var(--bg-main)',
                    surface: 'var(--bg-surface)',
                    elevated: 'var(--bg-elevated)',
                },
                text: {
                    primary: 'var(--text-primary)',
                    secondary: 'var(--text-secondary)',
                },
                accent: {
                    main: 'var(--accent-main)',
                    hover: 'var(--accent-hover)',
                },
                border: {
                    main: 'var(--border-main)',
                    subtle: 'var(--border-subtle)',
                },
            },
        },
    },
    plugins: [],
}