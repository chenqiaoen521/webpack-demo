import './less/index.less'
import './assets/web-icons/web-icons.less'
let func = () => {
  console.log('this is function')
  console.log('this is jinxue')
  let div = document.createElement('div')
  div.className = 'box'
  document.body.appendChild(div)
}
func()