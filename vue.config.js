const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  /**更改默认端口号 */
  devServer: {
    host: "localhost",
    port: 8888,
    open: true,
  },
});
