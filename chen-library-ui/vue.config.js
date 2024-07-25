const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    // 配置别名
    config.resolve.alias.set('@', path.join(__dirname, 'src'))
  },
  css: {
    loaderOptions: {
      // 配置 sccs 全局变量
      scss: {
         additionalData: `@import "@/styles/variable.scss";`
      }
    }
  }
})