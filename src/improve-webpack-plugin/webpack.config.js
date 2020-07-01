/**
 * @file 如何优化改进 Webpack 的构建速度和打包结果？
 * 1、不同环境下不同配置；开发环境使用 webpack.config.dev.js ; 生产环境使用 webpack.config.prod.js;
 * 2、生产模式下的优化插件: Define Plugin 、Mini CSS Extract Plugin 、Optimize CSS Assets Webpack Plugin 、TerserWebpackPlugin等；
 * 3、合理配置mode, devtool的值；
 */
const merge = require('webpack-merge');
const devConfig = require('./config/webpack.config.dev');
const prodConfig = require('./config/webpack.config.prod');
const commonConfig = require('./config/webpack.config.common');


/**
 * @function 根据不同的环境，返回不同的配置
 * @param {*} env build命令中配置参数 webpack --config ./src/improve-webpack-plugin/webpack.config.js --env dev
 * @param {*} argv 
 * 
 * 1、webpack-merge
 * Object.assign 方法，会完全覆盖掉前一个对象中的同名属性。这个特点对于普通值类型属性的覆盖都没有什么问题。
 * 但是像配置中的 plugins 这种数组，我们只是希望在原有公共配置的插件基础上添加一些插件，那 Object.assign 就做不到了。
 * 所以我们需要更合适的方法来合并这里的配置与公共的配置。webpack-merge应运而生，它专门用来满足我们这里合并 Webpack 配置的需求。
 */
module.exports = (env, argv) => {
  console.log({
    env,
    argv,
  });
  if (env === 'dev') {
    return merge(commonConfig, devConfig);
  } else {
    return merge(commonConfig, prodConfig);
  }
}
