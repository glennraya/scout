import defaultTheme from 'tailwindcss/defaultTheme'
import forms from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx'
    ],

    theme: {
        extend: {
            backgroundImage: {
                hero: "url('/images/movies.png')"
            },
            fontFamily: {
                sans: [
                    '"Inter var", sans-serif',
                    {
                        fontFeatureSettings: '"cv11", "ss01"',
                        fontVariationSettings: '"opsz" 32'
                    }
                ],
                mono: ['JetBrainsMono', 'SFMono-Regular'],
                seaside: ['Seaside', ...defaultTheme.fontFamily.sans],
                honk: ['Honk', ...defaultTheme.fontFamily.sans]
            }
        }
    },

    plugins: [forms]
}
