import axios from 'axios';
import config from '@/config.js'
import authHeader from './auth-header';

const API_URL = config.servername;
const SECRET = config.secret;

class UserService {
  
  // get user details
  read(id) {
    return axios.get(API_URL + 'users/' + id ,data,{
      headers: authHeader()
    }).then(response => {
          return response.data;
    }).catch(error => {
      console.log(error)
    }).finally(() => this.loading = false);
  }

  // get user posts
  getPosts(id) {
    return axios.get(API_URL + 'users/' + id + '/posts',{
      headers: authHeader()
    }).then(response => {
      console.log('UserService:getPosts', response.data)
          return response.data;
    }).catch(error => {
      console.log(error)
    }).finally(() => this.loading = false);
  }

  // create user post
  createPost(id, data) {
    return axios.post(API_URL + 'users/' + id + '/posts',data,{
      headers: authHeader()
    }).then(response => {
          return response.data;
    }).catch(error => {
      console.log(error)
      return error;
    }).finally(() => console.log('completed'));
  }

  // get user posts
  getPostsComments(id) {
    return axios.get(API_URL + 'posts/' + id + '/comments',{
      headers: authHeader()
    }).then(response => {
      console.log('UserService:getPosts', response.data)
          return response.data;
    }).catch(error => {
      console.log(error)
    }).finally(() => this.loading = false);
  }

  // create user post
  createPostComment(id, data) {
    return axios.post(API_URL + 'posts/' + id + '/comments',data,{
      headers: authHeader()
    }).then(response => {
          return response.data;
    }).catch(error => {
      console.log(error)
      return error;
    }).finally(() => console.log('completed'));
  }

}

export default new UserService();
