import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import store from '@/store'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/404'] // 白名单：无需登录，可以跳转查看的路由地址

router.beforeEach(async(to, from, next) => {
  NProgress.start()

  const token = store.getters.token
  if (token) { // 登陆了
    if (to.path === '/login') { // 去登陆页
      next('/')
      NProgress.done()
    } else { // 去别的页面
      next()
      if (!store.getters.name) { store.dispatch('user/getUserInfoActions') }
    }
  } else { // 没有登陆
    if (whiteList.includes(to.path)) { // 要去的路由地址字符串，是否在白名单里面，出现过就放行
      next()
    } else { // 去别的页面(内部项目，不登录别的页面不可以去)
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
