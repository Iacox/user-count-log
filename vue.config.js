module.exports = {
  pwa: {
    name: "Type-count-secure",
    themeColor: "#ffffff",
    msTileColor: "#414447",
    appleMobileWebAppStatusBarStyle: "black",
    manifestOptions: {
      background_color: "#ffffff",
      description: "Защита от физической подмены пользователя",
      display: "fullscreen",
      name: "Type-count-secure",
      short_name: "secure-service",
      start_url: ".",
    },
  },
  publicPath: "/user-count-log/",
  // devServer: {
  //   proxy: {
  //     "^/api": {
  //       target: "http://192.168.10.93:8000/crm.php",
  //       changeOrigin: true,
  //     },
  //   },
  // },
};