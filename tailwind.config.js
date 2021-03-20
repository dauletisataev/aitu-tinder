const plugin = require("tailwindcss/plugin");

const MyTheme = {
  colors: {
    primary: "#069C54",
    "primary-alt": "#048654",
    title: "#393939",
    paragraph: "#707070",
    light: "#A6A6A6",
    body: "#FBFEFD",
  },
};

module.exports = {
  purge: ["./src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      helvetica: [
        "Helvetica Neue",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
    },
    extend: {
      colors: {
        ...MyTheme.colors,
      },
      boxShadow: {
        b: "0px 10px 12px -14px rgba(0,0,0,0.75)",
      },
      maxHeight: {
        "9/10": "90%",
      },
      backgroundImage: (theme) => ({
        "food-cover":
          "url(https://yastatic.net/s3/eda-front/www/assets/fallback-pattern-9d2103a870e23618a16bcf4f8b5efa54.svg)",
      }),
      width: {
        "food-cart": "230px",
      },
      animation: {
        "popup-bottom": "popup-bottom 0.3s ease-in-out",
        "fade-in": "fadeIn 0.2s ease-out",
        slideInFromRight: "slideInFromRight 0.3s ease-in-out",
        slideOutToRight: "slideOutToRight 0.3s ease-in-out",
      },
      keyframes: {
        "popup-bottom": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        spin: {
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        slideInFromRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideOutToRight: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("tailwind-scrollbar"),
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".border-t-current": {
          "border-top-color": "currentColor",
        },
      };

      addUtilities(newUtilities);
    }),
  ],
};
