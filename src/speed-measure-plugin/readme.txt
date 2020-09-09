https://www.vue-js.com/topic/5e57a5d87d2d480729ae767c



优化 webpack 构建速度的第一步是知道将精力集中在哪里。我们可以通过 speed-measure-webpack-plugin 测量你的 webpack 构建期间各个阶段花费的时间：

// 分析打包时间
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
// ...
module.exports = smp.wrap(prodWebpackConfig)
特定的项目，都有自己特定的性能构建瓶颈，下面我们对打包的每一个环节进行优化。

二、分析影响打包速度环节
在「窥探原理：手写一个 JavaScript 打包器」中，我们已经介绍过，打包就是从入口文件开始将所有的依赖模块打包到一个文件中的过程，当然，在打包过程中涉及各种编译、优化过程。

打包过程中，常见影响构建速度的地方有哪些喃？

1. 开始打包，我们需要获取所有的依赖模块
搜索所有的依赖项，这需要占用一定的时间，即搜索时间，那么我们就确定了：

我们需要优化的第一个时间就是搜索时间。

2. 解析所有的依赖模块（解析成浏览器可运行的代码）
webpack 根据我们配置的 loader 解析相应的文件。日常开发中我们需要使用 loader 对 js ，css ，图片，字体等文件做转换操作，并且转换的文件数据量也是非常大。由于 js 单线程的特性使得这些转换操作不能并发处理文件，而是需要一个个文件进行处理。

我们需要优化的第二个时间就是解析时间。

3. 将所有的依赖模块打包到一个文件
将所有解析完成的代码，打包到一个文件中，为了使浏览器加载的包更新（减小白屏时间），所以 webpack 会对代码进行优化。

JS 压缩是发布编译的最后阶段，通常 webpack 需要卡好一会，这是因为压缩  JS 需要先将代码解析成 AST 语法树，然后需要根据复杂的规则去分析和处理 AST，最后将 AST 还原成  JS，这个过程涉及到大量计算，因此比较耗时，打包就容易卡住。

我们需要优化的第三个时间就是压缩时间。

4. 二次打包
当更改项目中一个小小的文件时，我们需要重新打包，所有的文件都必须要重新打包，需要花费同初次打包相同的时间，但项目中大部分文件都没有变更，尤其是第三方库。

我们需要优化的第四个时间就是二次打包时间。

三、 优化解析时间 - 开启多进程打包
运行在 Node.js 之上的 webpack 是单线程模式的，也就是说，webpack 打包只能逐个文件处理，当 webpack 需要打包大量文件时，打包时间就会比较漫长。

1. thread-loader（webpack4 官方推荐）
把这个 loader 放置在其他 loader 之前， 放置在这个 loader 之后的 loader 就会在一个单独的 worker【worker pool】 池里运行，一个worker 就是一个nodeJS 进程【node.js proces】，每个单独进程处理时间上限为600ms，各个进程的数据交换也会限制在这个时间内。

thread-loader 使用起来也非常简单，只要把 thread-loader 放置在其他 loader 之前， 那 thread-loader 之后的 loader 就会在一个单独的 worker 池(worker pool)中运行。
注意：请仅在耗时的 loader 上使用；当项目较小时，多进程打包反而会使打包速度变慢。
官方上说每个 worker 大概都要花费 600ms ，所以官方为了防止启动 worker 时的高延迟，提供了对 worker 池的优化：预热。



四、合理利用缓存（缩短连续构建时间，增加初始构建时间）
使用 webpack 缓存的方法有几种，例如使用 cache-loader，HardSourceWebpackPlugin 或 babel-loader 的 cacheDirectory 标志。 所有这些缓存方法都有启动的开销。 重新运行期间在本地节省的时间很大，但是初始（冷）运行实际上会更慢。

如果你的项目生产版本每次都必须进行初始构建的话，缓存会增加构建时间，减慢你的速度。如果不是，那它们就会大大缩减你二次构建的时间。

1. cache-loader
cache-loader 和 thread-loader 一样，使用起来也很简单，仅仅需要在一些性能开销较大的 loader 之前添加此 loader，以将结果缓存到磁盘里，显著提升二次构建速度。
⚠️ 请注意，保存和读取这些缓存文件会有一些时间开销，所以请只对性能开销较大的 loader 使用此 loader。





