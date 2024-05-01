/** @type {import('tailwindcss').Config} */
module.exports = {
    container: {
        center: false,
        maxWidth: {
            'md': '100%',
            'ld': '100%',
            'x1': '100%',
            'sm': '100%',
        }
    },
    darkMode: 'class',
    content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    safelist: [
        'border-red-600',
        'border-yellow-500',
        'border-green-500',
        'text-red-600',
        'text-yellow-500',
        'text-green-500',
    ],
    theme: {
        //alle custom tailwind generated classes voor de thema's
        extend: {
            fontSize: {
                xs: '0.8rem',
                xxs: '10px'
            },
            colors: {
                primary: 'var(--colors-primary)',
                buttonPrimaryBg: 'var( --button-primary-bg)',
                buttonPrimaryBgHover: 'var( --button-primary-bg_hover)',
                buttonPrimaryFg: 'var(--button-primary-fg)',
                buttonSecondaryBg: 'var( --button-secondary-bg)',
                buttonSecondaryBgHover: 'var( --button-secondary-bg_hover)',
                buttonSecondaryFg: 'var(--button-secondary-fg)',
                textPrimary: 'var(--text-primary)',
                textSecondary: 'var(--text-secondary)',
                textTertiary: 'var(--text-tertiary)',
                textPlaceholder: 'var(--text-placeholder)',
                textErrorPrimary: 'var(--text-error-primary)',
                background: 'var(--background)'
            },
            boxShadow: {
                'card': '0px 6px 14px 0px rgba(131, 23, 67, 0.02), 0px 26px 26px 0px rgba(131, 23, 67, 0.02), 0px 58px 35px 0px rgba(131, 23, 67, 0.01), 0px 102px 41px 0px rgba(131, 23, 67, 0.00), 0px 160px 45px 0px rgba(131, 23, 67, 0.00)',
                'input': '0px 1px 2px 0px rgba(3, 7, 18, 0.04)',
                'button': '0px 2px 4px 0px rgba(131, 24, 67, 0.04)',
                'custom': '0 3px 10px rgb(0,0,0,0.2)',
                'persona': '0px 160px 45px 0px rgba(131, 23, 67, 0.00), 0px 102px 41px 0px rgba(131, 23, 67, 0.00), 0px 58px 35px 0px rgba(131, 23, 67, 0.01), 0px 26px 26px 0px rgba(131, 23, 67, 0.02), 0px 6px 14px 0px rgba(131, 23, 67, 0.02)',
                'creator-type': '0px 160px 45px 0px rgba(131, 23, 67, 0.00), 0px 102px 41px 0px rgba(131, 23, 67, 0.00), 0px 58px 35px 0px rgba(131, 23, 67, 0.01), 0px 26px 26px 0px rgba(131, 23, 67, 0.02), 0px 6px 14px 0px rgba(131, 23, 67, 0.02)'
            },
            backgroundColor: {
                main: 'linear-gradient(180deg, rgba(255, 255, 255, 0.20) 0%, rgba(253, 242, 248, 0.20) 100%), #FFF'
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}
