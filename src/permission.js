import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/myAuth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist
// async await  es7的语法 用于处理异步曹邹
// async用于修饰function
//   await 用于在方法中进行阻塞式异步处理
router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
	console.log(hasToken);
  if (hasToken) {
   
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      // next({ path: '/' })
      NProgress.done()
    } else {
      // 从vuex获取的  咱们简化  从localstorage huoqu 
      // const hasGetUserInfo = store.getters.name
      //获取用户名
      const hasGetUserInfo = hasToken.username;
			console.log(hasToken.username);
      if (hasGetUserInfo) {
        next()
      } else {
        next(`/login`)
          NProgress.done()
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
