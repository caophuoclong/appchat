module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        leftBarBackground: "#FAFAFA",
        glareGreen: "#21978B",
        glareGreen100: "#a7f0e9",
        glareYellow: "#F8EDDD",
        glareBrown: "#9E896A",
        glareGray200: "#E8E8E8",
      },
      colors: {
        glareBlack: "#141414",
        glareGray: "#4F5665",
        glareGray500: "#C7C3C3",
        glareGray200: "#E8E8E8",
        glareBrown100: "#9E896A",
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
        "10r": "2.5rem",
      },
      minHeight: {
        "20": "5rem",
        "30": "7.5rem",
        "40": "10rem",
        "50": "12.5rem"
      },
      screen: {
        "phone": "640px",
      }
    },
  },
  plugins: [],
}