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
})

module.exports = {
  devServer:{
    proxy:{
      '/api':{
        target: 'http://localhost:3000'
      }
    }
  }

}
