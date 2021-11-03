// tailwind.config.js
module.exports = {
  // mode: 'jit',
  // purge: [
  //   './public/**/*.html',
  //   './src/**/*.{js,jsx,ts,tsx,vue}',
  // ],
  theme: {
    // ...
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    // ...
  ],
  variants: {
    extend: {
        display: ['group-hover', 'group-focus', 'focus-within'],
        width: ['group-focus'],
        flexDirection: ['group-focus'],
    },
  },
}
