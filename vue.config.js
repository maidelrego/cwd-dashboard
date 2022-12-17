const path = require('path')

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'build.js',
    publicPath: './static'
  },
  configureWebpack: {
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'build.js',
      publicPath: './static'
    }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Custom Wood Designs'
        return args
      })
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/assets/scss/_variables.scss";'
      }
    }
  },
})

module.exports = {
  // outputDir: path.resolve(__dirname,'../public'),
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      }
    }
  }

}
