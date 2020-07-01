const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let prodConfig = {
  mode: 'production', // 在 Webpack 4 中新增的 production 模式下，内部就自动开启了很多通用的优化功能。
  devtool: 'nosources-source-map', // 报错信息可以看到行信息，但看不到源码
  module: {
    rules: [
      {
        test: /.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [

  ]
}

module.exports = prodConfig;