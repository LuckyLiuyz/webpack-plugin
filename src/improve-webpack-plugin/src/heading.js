import './heading.css'

export default () => {
  const element = document.createElement('h2')

  // 在此处可以直接获取到DefinePlugin插件定义的全局变量.
  console.log('1111111', API_BASE_URL);
  element.textContent = 'DefinePlugin插件定义的全局变量：API_BASE_URL=' + JSON.stringify(API_BASE_URL);
  element.classList.add('heading')
  element.addEventListener('click', () => {
    alert('Hello webpack')
  })

  return element
}
