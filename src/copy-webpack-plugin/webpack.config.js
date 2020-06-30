const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

/**
 * @description Webpack 在寻找相对路径的文件时会以 context 为根目录，context 默认为执行启动 Webpack 时所在的当前工作目录。
 * 当配置` context: path.resolve(__dirname) `时，便把context值设置为了 `src/copy-webpack-plugin`了，所以即可设置入口文件为`entry: './src/main.js'`
 * 当不配置入口文件时，webpack的执行启动在最外层的package.json中，此时入口文件需要设置为` ./src/copy-webpack-plugin/src/main.js `
 * 同理，HtmlWebpackPlugin的template也是同样道理。
 */
module.exports = {
  context: path.resolve(__dirname),
  mode: 'none',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    // publicPath: 'dist/'
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
    new CleanWebpackPlugin(),
    // 用于生成 index.html
    new HtmlWebpackPlugin({
      title: 'Webpack Plugin Sample',
      meta: {
        viewport: 'width=device-width', // 给模板html设置meta标签
      },
      template: './src/index.html'
    }),
    // 用于生成 about.html
    new HtmlWebpackPlugin({
      filename: 'about.html'
    }),
    new CopyWebpackPlugin([
      {
        from: __dirname + '/public', // 定义要拷贝的源文件
        to: __dirname + '/dist', // 定义要拷贝到的目标文件夹
        ignore: ['*.txt'], //忽略拷贝指定的文件,此时将会忽略拷贝readme.txt文件
      }
    ])
  ]
}
