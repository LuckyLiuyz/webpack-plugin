const path = require('path')

let devConfig = {
  mode: 'development',
  devtool: 'cheap-eval-module-source-map',
  module: {
    rules: [
      {
        test: /.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
    ]
  },
  plugins: [

  ]
}

module.exports = devConfig;