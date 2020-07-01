const path = require('path');
const webpack = require('webpack');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

/**
 * @function 生产模式下的相关优化插件
 * 
 * 1、DefinePlugin：用来为我们代码中注入全局成员的。
 * 在 production 模式下，默认通过这个插件往代码中注入了一个 process.env.NODE_ENV。
 * 很多第三方模块都是通过这个成员去判断运行环境，从而决定是否执行例如打印日志之类的操作。
 * DefinePlugin 是一个内置的插件，可直接使用 webpack.DefinePlugin。这个插件的构造函数接收一个对象参数，对象中的成员都可以被注入到代码中。
 * 
 * 2、Mini CSS Extract Plugin：将 CSS 代码从打包结果中提取出来的插件
 * 对于 CSS 文件的打包，一般我们会使用 style-loader 进行处理，这种处理方式最终的打包结果就是 CSS 代码会内嵌到 JS 代码中。
 * Mini CSS Extract Plugin 需要我们使用 MiniCssExtractPlugin.loader 去替换掉 style-loader，以此来捕获到所有的样式。
 * 这样的话，打包过后，样式就会存放在独立的文件中，直接通过 link 标签引入页面。
 * 需要注意的是，如果 CSS 体积不是很大的话，提取到单个文件中，效果可能适得其反，因为单独的文件就需要单独请求一次。
 * 个人经验是如果 CSS 超过 200KB 才需要考虑是否提取出来，作为单独的文件。
 * 
 * 3、Optimize CSS Assets Webpack Plugin： 用于压缩 Mini CSS Extract Plugin 提取出来的样式文件。
 * 使用了 Mini CSS Extract Plugin 过后，样式就被提取到单独的 CSS 文件中了。但是这里同样有一个小问题。
 * 按照之前的了解，生产模式下会自动压缩输出的结果，我们可以打开打包生成的文件,发现 JS 是压缩过的，但是 CSS 是未压缩的。
 * 这是因为，Webpack 内置的压缩插件仅仅是针对 JS 文件的压缩，其他资源文件的压缩都需要额外的插件。所以可使用当前插件实现对CSS的压缩。
 * ##注意##：在这个插件的官方文档中发现，文档中的这个插件并不是配置在 plugins 数组中的，而是添加到了 optimization 对象中的 minimizer 属性中。
 * 其实也很简单，如果我们配置到 plugins 属性中，那么这个插件在任何情况下都会工作。而配置到 minimizer 中，就只会在 minimize 特性开启时才工作。
 * 所以 Webpack 建议像这种压缩插件，应该我们配置到 minimizer 中，便于 minimizer 选项的统一控制。
 * 
 * 4、TerserWebpackPlugin： 启动 minimizer 时，手动配置 JS 文件的压缩。
 * 经过 Optimize CSS Assets Webpack Plugin 启动 minimizer 的配置之后，CSS虽然能压缩了，但是这么配置也有个缺点：
 * 此时我们再次运行生产模式打包，打包完成后再来看一眼输出的 JS 文件，此时你会发现，原本可以自动压缩的 JS，现在却不能压缩了。
 * 那这是因为我们设置了 minimizer，Webpack 认为我们需要使用自定义压缩器插件，那内部的 JS 压缩器就会被覆盖掉。
 * 我们必须手动再添加回来：new TerserWebpackPlugin()。
 * 
 */
let devConfig = {
  mode: 'development',
  devtool: 'cheap-eval-module-source-map',
  module: {
    rules: [
      {
        test: /.css$/,
        use: [
          // 'style-loader', // 将样式通过 style 标签注入
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin(),
      new OptimizeCssAssetsWebpackPlugin(),
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      API_BASE_URL: 'https://api.example.com'
    }),

    new MiniCssExtractPlugin(),

  ]
}

module.exports = devConfig;