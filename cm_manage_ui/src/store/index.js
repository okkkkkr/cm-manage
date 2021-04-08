import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import unit from './modules/unit/unit'
import related from './modules/related/related'
import residents from './modules/residents/residents'
import process from './modules/process/process'
import databoard from './modules/databoard/databoard'


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    unit,
    related,
    residents,
    process,
    databoard
  },
  getters
})

export default store
