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
        
        oColors: {
          blue: '22BDDE',
          orange: 'F5A353',
          red: 'E86264',
          green: '38AF91'
        },
        bShowLogin: true,
        bShowSignup: false,
        bHasUser: false,
        bShowLoader: false,
        oUserData: {},
        aProjects: [],
        aDailyTasks: [],
        aWeeklyTasks: [],
        aTaskByProjects: [],
        oTaskToEdit: undefined,
        aDataSource: undefined,
        oHeader: {
          'title': 'Dashboard',
          'src': 'https://img.icons8.com/sf-regular/50/14a4ad/dashboard.png'
        },
        sTab: 'dashboard',
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
          if(bShow === true) {
            state.bShowLoader = true;
            return false;
          }
          
          setTimeout(function() {
            state.bShowLoader = false;
          }, 1500);
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
        },
        setDataSource(state, aData) {
          state.aDataSource = aData;
        },
        setHeader(state, oData) {
          state.oHeader = oData
        },
        setTab(state, sTab) {
          state.sTab = sTab;
        },
        resetDashboard(state){
          state.oHeader = {
            'title': 'Dashboard',
            'src': 'https://img.icons8.com/sf-regular/50/14a4ad/dashboard.png'
          },
          state.bHasUser = false;
          state.bShowSignup = false;
          state.bShowLogin = true;
          state.aDataSource = undefined;
          state.sTab = 'dashboard';
          state.bShowLoader = false;
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
              commit('setProjects', response.data.data);
              commit('toggleLoader', false);
            }).catch((error) => {
              commit('toggleLoader', false);
              reject(error);
            })
          })
        },

        addTask({commit}, oData) {
          return new Promise((resolve, reject) => {
            api.post('/api/add-task', oData).then((response) => {
              commit('toggleLoader', false);
              resolve(response);
            }).catch((error) =>{
              commit('toggleLoader', false);
              reject(error);
            })
          })
        },

        editTask({commit}, oData) {
          return new Promise((resolve, reject) => {
            api.put('/api/update-task', oData).then((response) => {
              commit('toggleLoader', false);
              resolve(response);
            }).catch((error) =>{
              commit('toggleLoader', false);
              reject(error);
            })
          })
        },

        getWeeklyTasks({commit}, iMemberId) {
          return new Promise((resolve, reject) => {
            api.get(`/api/get-tasks/weekly/${iMemberId}`).then((response) => {
              commit('setWeeklyTasks', response.data.data);
              commit('setDataSource', response.data.data);
              commit('toggleLoader', false);
              commit('setHeader', { 'title': 'Dashboard', 'src': 'https://img.icons8.com/sf-regular/50/14a4ad/dashboard.png'});
              commit('setTab', 'dashboard');
              resolve(response)
            })
            .catch((error)=> {
              reject(error)
            })
          })
        },

        getProjectTasks({commit, state}, iProjectId) {
          return new Promise((resolve, reject) => {
            api.get(`/api/get-tasks/project/${iProjectId}`).then((response) => {
              commit('setDataSource', response.data.data);
              commit('toggleLoader', false);
              commit('setTab', 'proj' + iProjectId);
              commit('setHeader', { 'title': state.oHeader.title, 'src': state.oHeader.src});
              resolve(response)
            })
            .catch((error)=> {
              commit('toggleLoader', false);
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