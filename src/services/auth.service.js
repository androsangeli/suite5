import axios from 'axios';
import qs from 'qs';
import store  from '@/store/index';
import config from '@/config.js'
import _ from 'lodash';

const API_URL = config.servername+'/';
const SECRET = config.secret;

class AuthService {
  login(data) {
    return axios
      .post(API_URL + 'login', {
        email: data.email,
        password: data.password
      },{
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Basic ' + SECRET,
            'Content-Type' : 'application/json'
          }
      })
      .then(response => {
        if (response.data.data.token) {
          localStorage.setItem('token', JSON.stringify(response.data.data.token));
          localStorage.setItem('user', JSON.stringify({id: response.data.data.user.id}));

          if (!localStorage.getItem('lang')) {
            localStorage.setItem('lang', 'en');
          }
        
        }

        return response.data.data;
      });
  }

  logout(user) {
    
    localStorage.removeItem('token');
    localStorage.removeItem('lang');
    
    if (_.get(user, 'id')) {
    
      return axios.post(API_URL + 'logout', {
        id: user.id
      }) 
      .then(response => {
        return response;
      });
    
    }

  }

  authenticate(token) {
    return axios.post(API_URL + 'authenticate', {
        token: token
      },{
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer '+ token,
            'Content-Type' : 'application/json'          
          }
      }).then(response => {
            if (!localStorage.getItem('lang')) {
              localStorage.setItem('lang', 'en');
            }

            return response.data.data;
      });
    }

  passwordForgot(data) {
    console.log('passwordforgot data',data)
    return axios.post(API_URL + 'password/email',
      data,{
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Basic ' + SECRET,
            'Content-Type' : 'application/json'
          }
      }).then(response => {
            return response.data;
      });
    }

  passwordReset(data) {
    return axios.post(API_URL + 'password/reset',
      data,{
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer '+ store.state.auth.token, 
            'Content-Type' : 'application/json'
          }
      }).then(response => {
            return response.data;
      }).catch(error => {
        console.log(error)
        // this.errored = true
      })
      .finally(() => this.loading = false);
    }

    accountOpen(data) {
    return axios.post(API_URL + 'account/preactivate',
      data,{
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Basic ' + SECRET,
            'Content-Type' : 'application/json'/*,
            'Access-Control-Allow-Origin' : '*' */
          }
      }).then(response => {
            return response.data;
      }).catch(error => {
        console.log(error)
        // this.errored = true
      })
      .finally(() => this.loading = false);
    }

    accountActivate(data) {
    return axios.post(API_URL + 'account/activate',
      data,{
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Basic ' + SECRET, 
            'Content-Type' : 'application/json'/*,
            'Access-Control-Allow-Origin' : '*' */
          }
      }).then(response => {
            return response.data;
      }).catch(error => {
        console.log(error)
        // this.errored = true
      })
      .finally(() => this.loading = false);
    }

}

export default new AuthService();
