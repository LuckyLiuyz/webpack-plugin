/**
 * @file 自定义plugin
 * @description 作用：删除webpack打包生成的js文件中的注释
 * 
 * webpack在打包过程中有自己的生命周期函数，webpack打包过程做了分类，于是就有了很多不同类型的插件。
 * 其中有两个重要的对象：compilation，compiler
 * compiler：包含webpack的所有配置信息（webpack.config.js），作为 webpack 的实例在启动时被初始化。
 * compilation：包含当前模块，编译文件，例如在开发环境，当文件发生变化，就会有一个新的 compilation。
 * 
 * 从表现上看，compiler暴露了和webpack整个生命周期相关的钩子，通过如下的方式访问:
 * 基本写法: compiler.hooks.someHook.tap(...)
 * 如果希望在entry配置完毕后执行某个功能: compiler.hooks.entryOption.tap(...)
 * 如果希望在生成的资源输出到output指定目录之前执行某个功能: compiler.hooks.emit.tap(...)
 * 
 * 
 * 如何写一个自定义plugin呢？根据webpack官方文档的说明，一个自定义的plugin需要包含：
 * 1、一个javascript命名函数
 * 2、插件函数的prototype上要有一个apply方法
 * 3、指定一个绑定到webpack自身的事件钩子
 * 4、注册一个回调函数来处理webpack实例中的指定数据
 * 5、处理完成后调用webpack提供的回调
 */
class MyPlugin {
    apply (compiler) {
        console.log('MyPlugin 启动');
        // 通过emit钩子获取编译后文件。emit在生成资源到 output 目录之前触发，这是一个异步串行 AsyncSeriesHook 钩子
        compiler.hooks.emit.tap('MyPlugin', compilation => {
            // compilation => 可以理解为此次打包的上下文
            for (const name in compilation.assets) {
                // console.log(name)
                // console.log(compilation.assets[name].source())
                if (name.endsWith('.js')) {
                    const contents = compilation.assets[name].source()
                    const withoutComments = contents.replace(/\/\*\*+\*\//g, ''); // 正则匹配注释，将其替换为空字符串
                    compilation.assets[name] = {
                        source: () => withoutComments,
                        size: () => withoutComments.length
                    }
                }
            }
        })
    }
}
module.exports = MyPlugin;