module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        leftBarBackground: "#FAFAFA",
        glareGreen: "#21978B",
        glareGray200: "#E8E8E8",
      },
      colors: {
        glareBlack: "#141414",
        glareGray: "#4F5665",
        glareGray500: "#C7C3C3",
        glareGray200: "#E8E8E8",
      },
      minWidth: {
        "347": "347px",
        "350": "350px",
        "360": "360px",
        "400": "400px",
      },
      maxWidth: {
        "1/2": "50%",
      },
      maxHeight: {
        "70": "70%",
        "75": "75%",
      },
      height: {
        "90": "90%",
        "10": "10%",
        "75": "75%",
        "85": "85%",
      }
    },
  },
  plugins: [],
}