module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  // daisyui: {
  //   themes: [
  //     {
  //       pearl: {
  //         primary: "#1677FF",
  //         secondary: "#ffffff",
  //         accent: "#006D75",
  //         neutral: "#3D4451",
  //         "base-100": "#FFFFFF",
  //         info: "#3ABFF8",
  //         success: "#00B578",
  //         warning: "#FF8F1F",
  //         error: "#FF3141",
  //       },
  //     },
  //   ],
  // },
  plugins: [require("daisyui")],
};
