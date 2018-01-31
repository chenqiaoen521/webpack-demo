import './less/index.less'
import 'bootstrap'
import 'bootstrapSelect'
if (module.hot) {
  module.hot.accept()
}

let func = function* () {
  yield 1
  yield 2
  yield 3
}

let promis = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 1000)
})

promis.then((e) => {
  console.log(e)
})

let ite = func()
console.log(ite.next())

/* eslint-disable no-undef */
$('textarea.hook-textarea').on('keyup keydown', function() {
  $(this).parents('.panel.pd15').css({'height': 'auto'})
  let H = $(this).height()
  H = H + this.scrollTop
  $(this).height(H)
})
$('.panel.pd15').each(function() {
  let flag = $(this).data('flag')
  let H = $(this).innerHeight()
  if (!flag) {
    $(this).data('H', H)
    $(this).css({'height': '100px'})
    $(this).find('.timeline').hide()
    $(this).find('.wrapper').hide()
  } else {
    $(this).css({'height': H + 'px'})
    $(this).find('.timeline').show()
    $(this).find('.wrapper').show()
  }
})
$('[data-plugin="selectpicker"]').selectpicker({
  size: 7,
  showTick: true,
  tickIcon: 'wb-check',
  iconBase: 'icon',
  title: ' '
})
$('.pull-down-btn').click(function() {
  let me = this
  let flag = $(me).parent().data('flag')
  let H = $(me).parent().data('H')
  if (flag) {
    $(me).parent().data('flag', false)
    $(me).text('查看详情')
    let H = $(me).parent().innerHeight()
    $(me).parent().data('H', H)
    $(this).parent().animate({height: '100px'}, () => {
      $(me).parent().find('.timeline').hide()
      $(me).parent().find('.wrapper').hide()
    })
  } else {
    $(me).parent().data('flag', true)
    $(me).html('收起<i class="icon wb-chevron-up"></i>')
    $(this).parent().animate({height: H + 'px'}, () => {
      $(me).parent().find('.timeline').show()
      $(me).parent().find('.wrapper').show()
    })
  }
  if (!flag) {
    $(this).parent().siblings('div.panel.pd15').data('flag', false)
    $(this).parent().siblings('div.panel.pd15').animate({height: '100px'}, () => {
      $(this).find('.timeline').hide()
      $(this).find('.wrapper').hide()
      $(this).find('.pull-down-btn').text('查看详情')
    })
  }
})
$('[data-plugin="selectpicker"]').on('hidden.bs.select', function() {
  console.log('callback')
})
