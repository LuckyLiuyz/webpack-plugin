const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// 获取环境变量
const { env } = process;
// console.log({ env });

/**
 * @function webpack 配置
 * @param {*} params 
 * @param {*} argv 
 * 
 * 1、通过两种方式获取` npm run *** `对应的命令中的参数（如 --env.mode=development、annlyz=false）;
 * 其中，annlyz=false 是通过 `cross-env` 来设置跨平台的环境变量，最终通过 process.env获取设置的环境变量；
 * 而--env.mode=development，是作为webpack的执行参数，相关参数会直接注入到module.exports=(params, argv){}的入参中。
 * 
 */
module.exports = (params, argv) => {
  console.log({ params });

  let config = {
    mode: 'development',
    entry: './src/webpack-bundle-analyzer/index.js',
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'dist')
    },
    devtool: 'cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.js[x]?$/,
          use: [
            {
              loader: 'babel-loader'
            }
          ]
        },
        {
          test: /.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.less$/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
            'less-loader'
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
    devServer: {
      host: '127.0.0.1', //指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问，可指定为当前主机ip
      port: 9000, // 端口号
      contentBase: './dist', // 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要。devServer.publicPath 将用于确定应该从哪里提供 bundle，并且此选项优先。
      hot: true,
      open: true, //启用打开后，开发服务器启动后将自动打开浏览器
    },
    plugins: [
      new CleanWebpackPlugin(),
      // 用于生成 index.html
      new HtmlWebpackPlugin({
        title: 'webpack-bundle-analyzer-demo',
        meta: {
          viewport: 'width=device-width'
        },
        template: './src/webpack-bundle-analyzer/index.html'
      }),
    ]
  }

  // 追加 BundleAnalyzerPlugin 插件配置
  return merge(config, {
    plugins: [
      // 配置参数：https://www.npmjs.com/package/webpack-bundle-analyzer
      new BundleAnalyzerPlugin(
        {
          analyzerMode: 'static',
          analyzerHost: '127.0.0.1',
          analyzerPort: 8889,
          reportFilename: 'report.html',
          defaultSizes: 'parsed',
          openAnalyzer: true,
          generateStatsFile: false,
          statsFilename: 'stats.json',
          statsOptions: null,
          logLevel: 'info'
        }
      ),
    ]
  })
}
