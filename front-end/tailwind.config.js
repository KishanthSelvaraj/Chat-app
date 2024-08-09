// Install the plugin first:
// npm install tailwind-scrollbar

// Then update your config file:
import scrollbar from 'tailwind-scrollbar';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    scrollbar,  // Adds the scrollbar plugin
  ],
}
