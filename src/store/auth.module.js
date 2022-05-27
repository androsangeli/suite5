import AuthService from '../services/auth.service';

import axios from 'axios';
import store from '@/store';

const token = JSON.parse(localStorage.getItem('token'));



const initialState = token
  ? { status: { loggedIn: true }, user: {} }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, data) {
      return AuthService.login(data).then(
        data => {
          if (data.user.hasOwnProperty('id') && data.user.hasOwnProperty('email') && data.hasOwnProperty('token')) {
          // if (user.hasOwnProperty('accessToken')) {
            // console.log('loginSuccess', data);
            commit('loginSuccess', data);
            return Promise.resolve(data);
          } else {
            commit('loginFailure');
            return Promise.reject(data);  
          }
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }, user) {
      AuthService.logout(user);
      commit('logout');
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    },
    authenticate({ commit }, token) {
      return AuthService.authenticate(token).then(
        data => {
          if (localStorage.getItem('token')) {
            data.token = JSON.parse(localStorage.getItem('token'));
            commit('authenticateSuccess', data);
            return Promise.resolve(data);
          } else {
            commit('loginFailure');
            return Promise.reject(data.data);  
          }
          
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
  },
  mutations: {
    loginSuccess(state, data) {
      // console.log('loginSuccess data', data);
      state.status.loggedIn = true;
      state.user = data.user;
      state.token = data.token;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
      state.token = null;
    },
    authenticateSuccess(state, data) {
      state.status.loggedIn = true;
      state.user = data.user;
      state.token = data.token;
    },
    authenticateFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
      state.token = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
      state.token = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    }
  }
};
