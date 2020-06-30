import createHeading from './heading.js'
import './main.css'
import icon from './icon.png'

/**
 * 如果不使用window.onload， HtmlWebpackPlugin的inject:head时会报错。因为打包生成的js被放到head标签中，此时执行下述语句时body还没有生成！
 */
window.onload = () => {
    const heading = createHeading()

    document.body.append(heading)

    const img = new Image()
    img.src = icon

    document.body.append(img)
}

