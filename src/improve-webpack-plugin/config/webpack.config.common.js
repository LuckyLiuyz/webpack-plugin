/**
 * @file 如何优化改进 Webpack 的构建速度和打包结果？
 * 1、不同环境下不同配置；开发环境使用 webpack.config.dev.js ; 生产环境使用 webpack.config.prod.js.
 * 2、
 */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let commonPath = './src/improve-webpack-plugin';
let commonConfig = {
  entry: {
    main: `${commonPath}/src/main.js`,
    other: `${commonPath}/src/other.js`,
  },
  output: {
    filename: '[name].bundle.js',
    // path: path.join(commonPath, 'dist'),
  },
  module: {
    rules: [{
      test: /.png$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 10 * 1024, // 10 KB
          name: '[name].[hash:4].[ext]', // 设置处理后的文件名称格式
        }
      }
    }]
  },
  plugins: [
    new CleanWebpackPlugin(),

    // 根据template生成 index.html
    new HtmlWebpackPlugin({
      hash: true, // hash选项的作用是 给生成的 js 文件一个独特的 hash 值。例如：<script type=text/javascript src=bundle.js?22b9692e22e7be37b57e></script>
      title: 'Webpack Plugin Sample',
      meta: {
        viewport: 'width=device-width'
      },
      filename: 'main.html', //输出的html的文件名称
      template: `${commonPath}/src/index.html`, // 模板HTML路径
      // 压缩HTML文件
      minify: {
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true, // 压缩内联css
        minifyJS: true, //是否压缩html里的js（使用uglify-js进行的压缩）
        caseSensitive: true, //是否对大小写敏感，默认false
        collapseBooleanAttributes: true, //是否简写boolean格式的属性如：disabled="disabled" 简写为disabled  默认false
        // ...还有很多很多属性...
      },
      /**
       * 注入选项。有四个选项值 true, body, head, false.
       * true：默认值，script标签位于html文件的 body 底部
       * body：script标签位于html文件的 body 底部（同 true）
       * head：script 标签位于 head 标签内
       * false：不插入生成的 js 文件，只是单纯的生成一个 html 文件
       */
      inject: 'head',
      favicon: `${commonPath}/public/favicon.ico`, //给生成的 html 文件生成一个 favicon。属性值为 favicon 文件所在的路径名
      showErrors: true,// 作用:如果 webpack 编译出现错误，会将错误信息包裹在一个 pre 标签内,属性的默认值为 true,也就是显示错误信息。开启这个，方便定位错误
      /**
       * chunks主要用于多入口文件，当你有多个入口文件，那就回编译后生成多个打包后的文件，那么chunks 就能选择你要使用那些js文件
       * chunks数组的值就是entry对象的属性。此时配置生成的html中就会自动引入：
       * <script src="main.bundle.js?5b0647248f7102bf1b7f"></script>
       * <script src="other.bundle.js?5b0647248f7102bf1b7f"></script>
       */
      chunks: ['other', 'main'], // 与此相对应的配置还有【excludeChunks】用于排除那些js，可灵活使用
    }),
  ]
}

module.exports = commonConfig;