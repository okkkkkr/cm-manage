import Vue from 'vue'
import Router from 'vue-router'
import routes from './index.js'
import NProgress from 'nprogress'
// import 'nprogress/nprogress.css' 
// import getPageTitle from '@/utils/get-page-title' // 获取meta中的title

Vue.use(Router);

const router = new Router({
    routes
})

/**
 * 全局前置守卫
 * @func beforeEach
 * @param {object} to 即将要进入的目标 路由对象
 * @param {object} form 当前导航正要离开的路由
 * @func next 进行管道中的下一个钩子
 */
router.beforeEach((to, form, next) => {
    NProgress.start()
    next();
});

/**
 * 全局后置钩子
 * @func afterEach
 * @param {object} to 即将要进入的目标 路由对象
 * @param {object} form 当前导航正要离开的路由
 */
router.afterEach((to, form) => {
    NProgress.done()
});
export default router;