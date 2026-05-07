/** @type {import('tailwindcss').Config} */

module.exports = {
    mode: 'jit',
    content: ['./resources/js/**/*.{js,vue}', './resources/views/**/*.blade.php'],
    theme: {
        extend: {
            screens: {
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1536px',
            },

            colors: {
                primary: 'var(--color-primary)',
                secondary: 'var(--color-secondary)',
                tertiary: 'var(--color-tertiary)',
            },

            fontFamily: {
            },
        },
    },
    plugins: [],
};

export default module.exports;
