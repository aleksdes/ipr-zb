const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const t = new Date().getTime()/1000|0

module.exports = defineConfig({
  transpileDependencies: [
    'vuetify',
  ],

  configureWebpack: {
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "src"),
        "@": path.resolve(__dirname, "src")
      },
      extensions: ['.ts', '.js', '.vue', '.json']
    },
    output: {
      filename: `[name].${t}.[contenthash].bundle.js`,
      chunkFilename: `js/${t}_[name].js`,
    }
  },

  chainWebpack: (config) => {
    config.resolve.alias.set("~", path.join(__dirname, "./src"));
    config.resolve.alias.set("@", path.join(__dirname, "./src"));
  },

  css: {
    sourceMap: process.env.NODE_ENV !== 'production',
    loaderOptions: {
      scss: {
        additionalData: [
          `@import "vuetify/settings";`,
          `@import "@/assets/styles/variables/index";`,
        ].join('\n')
      },
    },
  }
});
