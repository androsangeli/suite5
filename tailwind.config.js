module.exports = {
   content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      display: ["group-hover"],
    },
  },
  plugins: [
        // require('flowbite/plugin')
    ]
}
