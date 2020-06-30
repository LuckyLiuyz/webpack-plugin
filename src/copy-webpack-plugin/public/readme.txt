我就是为了验证
new CopyWebpackPlugin([
    {
    from: __dirname + '/public', // 定义要拷贝的源文件
    to: __dirname + '/dist', // 定义要拷贝到的目标文件夹
    ignore: ['.*'], //忽略拷贝指定的文件
    }
])
中的ignore配置参数。