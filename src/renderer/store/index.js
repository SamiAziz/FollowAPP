import Vue from 'vue'
import Vuex from 'vuex'
import { stat } from 'fs-extra-p';
const Storage = require('electron-store');
const storage = new Storage();

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //user: localStorage.getItem('user'),
    //userName: localStorage.getItem('userName'),
    //userRole: localStorage.getItem('userRole'),
    activeWidget: null,
    currentLetter: '',
    letterSet: [],
    filterSet: [],
    viewData: [],
    viewSize: "5",
    pageTitle: 'متابعة المعاملات',
    currentPage: 'متابعة المعاملات',
    serverIp: storage.get('serverIp'),

    // ALERTS //
    alert:{
      alertType: '',
      alertTitle: '',
      alertShow: false,
    },
    currentAlert:{
      alertType: '',
      alertTitle: '',
      alertShow: false,
    },
    // ALERTS //

    editUser: '',

    showLoading: false,

    letterData: '',

    confirmModal:{
      data: '',
      title: '',
      show: false
    }

  },
  mutations: {
    changeActiveWidget(state, key) {
      state.activeWidget = state.activeWidget === key ? null : key
    },
    setLetter(state, letter) {
      state.currentLetter = letter
    },
    setFilter(state, filters) {
      state.filterSet = filters
    },
    setViewData(state, view) {
      state.viewData = []
      state.viewData = view
    },
    setViewSize(state, size) {
      state.viewSize = size
    },
    setPageTitle(state, title) {
      state.pageTitle = title
      state.currentPage = title
      console.log(title)
    },
    alertMSG(state, msg) {
      state.alert.alertType = msg.type
      state.alert.alertTitle = msg.title
      state.alert.alertShow = msg.show
      setTimeout(() => state.alert.alertShow=false, 3000)
    },
    currentAlertMSG(state, msg) {
      state.currentAlert.alertType = msg.type
      state.currentAlert.alertTitle = msg.title
      state.currentAlert.alertShow = msg.show
      if(msg.time != '') {return setTimeout(() => state.currentAlert.alertShow=false, msg.time)}
    },
    setLetterData(state, letter) {
      state.letterData = letter
    }
  },
  actions: {
    changeActiveWidget({state, commit}, key) {
      commit('changeActiveWidget', key)
    },
    setLetter({state, commit}, letter) {
      commit('setLetter', letter)
    },
    setFilter({state, commit}, filters) {
      commit('setFilter', filters)
    },
    setViewData({state, commit}, view) {
      commit('setViewData', view)
    },
    setViewSize({state, commit}, size) {
      commit('setViewSize', size)
    },
    setPageTitle({state, commit}, title) {
      commit('setPageTitle', title)
    },
    setAlert({state, commit}, msg) {
      commit('alertMSG', msg)
    },
    setCurrentAlert({state, commit}, msg) {
      commit('currentAlertMSG', msg)
    },
    setLetterData({state, commit}, letter) {
      commit('setLetterData', letter)
    }
  }
})
