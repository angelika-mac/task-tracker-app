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
        oUserData: {},
        aProjects: [],
        aDailyTasks: [],
        aWeeklyTasks: [],
        aTaskByProjects: [],
        oTaskToEdit: undefined
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
        },
        setUserData(state, oData) {
          state.oUserData = oData
        },
        setProjects(state, aProjects) {
          state.aProjects = aProjects
        },
        setDailyTasks(state, aData) {
          state.aDailyTasks = aData
        },
        setWeeklyTasks(state, aData) {
          state.aWeeklyTasks = aData
        },
        setProjectTasks(state, aData) {
          state.aTaskByProjects = aData
        },
        setTaskToEdit(state, oData){
          state.oTaskToEdit = oData
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
        },

        getProjects({commit}) {
          return new Promise((resolve, reject) => {
            api.get('/api/get-projects').then((response) => {
              resolve(response);
              commit('setProjects', response.data.data)
            }).catch((error) => {
              reject(error);
            })
          })
        },

        addTask({commit}, oData) {
          return new Promise((resolve, reject) => {
            api.post('/api/add-task', oData).then((response) => {
              resolve(response);
            }).catch((error) =>{
              reject(error);
            })
          })
        },

        editTask({commit}, oData) {
          return new Promise((resolve, reject) => {
            api.put('/api/update-task', oData).then((response) => {
              resolve(response);
            }).catch((error) =>{
              reject(error);
            })
          })
        },

        getDailyTasks({commit}, iMemberId) {
          return new Promise((resolve, reject) => {
            api.get(`/api/get-tasks/daily/${iMemberId}`).then((response) => {
              commit('setDailyTasks', response.data.data);
              resolve(response)
            })
            .catch((error)=> {
              reject(error)
            })
          })
        },

        getWeeklyTasks({commit}, iMemberId) {
          return new Promise((resolve, reject) => {
            api.get(`/api/get-tasks/weekly/${iMemberId}`).then((response) => {
              commit('setWeeklyTasks', response.data.data);
              resolve(response)
            })
            .catch((error)=> {
              reject(error)
            })
          })
        },

        deleteTask({commit}, iTaskId) {
          return new Promise((resolve, reject) => {
            api.delete(`/api/delete-task/${iTaskId}`).then((response) => {
              resolve(response);
            })
            .catch((error) => {
              reject(error);
            })
          })
        }
      }
    },
  },
});

export default store;