/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts.tsx}"],
  theme: {
    extend: {
      colors: {
        moderateBlue: "hsl(238, 40%, 52%)",
        softRed: "hsl(358, 79%, 66%)",
        lightGreyishBlue: "hsl(239, 57%, 85%)",
        paleRed: "hsl(357, 100%, 86%)",
        darkBlue: "hsl(212, 24%, 26%)",
        grayishBlue: "hsl(211, 10%, 45%)",
        lightGray: "hsl(223, 19%, 93%)",
        veryLightGray: "hsl(228, 33%, 97%)",
      },
      width: {
        "2rem": "30rem",
        reply: "90%",
      },
      gridTemplateColumns: {
        comment: "2rem 1fr",
      },
      padding: {
        you: "2px",
      },
    },
  },
  plugins: [],
};
