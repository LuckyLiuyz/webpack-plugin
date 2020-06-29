# webpack-plugin

探索 webpack 的 plugin 机制

## 多种 plugin demo 及自定义 plugin

```
通过执行不同的webpack配置文件，针对不同功能点进行打包
* `npm run build-my` 命令，用于验证自定义plugin；
* `npm run build-file` 命令，用于验证 clean-webpack-plugin；
* `npm run build-url` 命令，用于验证 copy-webpack-plugin；
* `npm run build-babel` 命令，用于验证 html-webpack-plugin；
* `npm run build-ideal` 命令，用于验证 热替换功能；
```

### 1、自定义 plugin

#### 通过自定义 plugin 实现将 webpack 编译打包生成的 js 文件中的大量 /\*\*\*\*/ 注释去除。

![blockchain]("自定义plugin配置信息")
![blockchain]("自定义plugin实现代码")

## 其他
