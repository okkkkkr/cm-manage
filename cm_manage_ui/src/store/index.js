import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import databoard from './modules/databoard/databoard'
import fund from './modules/fund/fund'
import stock from './modules/stock/stock'
import wh from './modules/warehouse/warehouse'


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    databoard,
    fund,
    stock,
    wh
  },
  getters
})

export default store
