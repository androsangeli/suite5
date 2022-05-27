import AuthService from '../services/auth.service';

import axios from 'axios';
import { store } from '../store';

const token = JSON.parse(localStorage.getItem('token'));



const initialState = {
  drawer: null,
  color: 'general',
  image: ''
}

export const app = {
  namespaced: true,
  state: initialState,
  actions: {
   
  },
  mutations: {
    
  }
};
