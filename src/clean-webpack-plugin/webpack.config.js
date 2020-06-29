const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'none',
  entry: './src/clean-webpack-plugin/src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/'
  },
  module: {
    rules: [
      {
        test: /.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /.png$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10 * 1024 // 10 KB
          }
        }
      }
    ]
  },
  plugins: [
    /**
     * 每次构建完成后都将构建结果放到dist目录中，如果每次构建的文件名都不同，则会导致dist越来越大，并且不容易区分最新构建的文件.
     * CleanWebpackPlugin能够在每次构建完成前，先将dist文件清空，然后再写入最新的构建结果
     */
    new CleanWebpackPlugin(),
  ]
}
