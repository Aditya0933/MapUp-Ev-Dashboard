module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        scrollbarThumb: '#888',  // Thumb color
        scrollbarTrack: '#f1f1f1',  // Track color
      },
      // Add custom scrollbar width and border-radius values
      scrollbar: {
        thin: '2px', // Make the scrollbar extra thin
        rounded: '50px', // Round the corners of the thumb and track
      },
    },
  },
  plugins: [
    // Include the scrollbar plugin
    require('tailwind-scrollbar'),
  ],
}