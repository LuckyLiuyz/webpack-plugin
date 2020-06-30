const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

console.log('context', path.resolve(__dirname, 'src'));

/**
 * @description Webpack 在寻找相对路径的文件时会以 context 为根目录，context 默认为执行启动 Webpack 时所在的当前工作目录。
 * 当配置` context: path.resolve(__dirname, 'src') `时，便把context值设置为了 `src/clean-webpack-plugin/src`了，所以即可设置入口文件为`entry: './main.js'`
 * 当不配置入口文件时，webpack的执行启动在最外层的package.json中，此时入口文件需要设置为` ./src/clean-webpack-plugin/src/main.js `
 */
module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'none',
  entry: './main.js',
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
            limit: 10 * 1024, // 10 KB
            name: '[name].[hash:4].[ext]', // 设置处理后的文件名称格式
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
