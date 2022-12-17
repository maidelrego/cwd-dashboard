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
  // outputDir: path.resolve(__dirname,'../public'),
  devServer:{
    proxy:{
      '/api':{
        target: 'cwd-server.up.railway.app'
      }
    }
  }

}
