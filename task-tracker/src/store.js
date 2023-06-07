import Vuex from 'vuex';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5173',
});

const store = new Vuex.Store({
  modules: {
    store: {
      namespaced: true,
      state: {
        bShowLogin: true,
        bShowSignup: false,
        bHasUser: false,
        bShowLoader: false,
      },
      mutations: {
        setShowLogin(state, bShow){
            state.bShowLogin = bShow;
        },
        setShowSignup(state, bShow){
            state.bShowSignup = bShow;
        },
        setHasUser(state, bHasUser) {
          state.bHasUser = bHasUser;
        },
        toggleLoader(state, bShow) {
          state.bShowLoader = bShow;
        }
      },

      actions: {
        getMember({commit}, oData) {
          return new Promise((resolve, reject) => {
            api.post('/api/get-member', oData).then((response) => {
              resolve(response)
            }).catch((error) => {
              reject(error);
            })
          })
        },

        insertMember({commit}, oData) {
          return new Promise((resolve, reject) => {
            api.post('/api/new-member', oData).then((response) => {
              resolve(response);
            }).catch((error) => {
              reject(error);
            })
          })
        },

        checkUsername({commit}, oData) {
          return new Promise((resolve, reject) => {
            api.post('/api/check-username', oData).then((response) => {
              resolve(response);
            }).catch((error) => {
               reject(error);
            })
          })
        }
      }
    },
  },
});

export default store;