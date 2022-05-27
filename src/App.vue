<template>
<div>
  <component :is="this.$route.meta.layout || 'div'">
  <!-- @slot Main router view -->
  <router-view />
  </component>
  <div v-if="scrollPixels > 200" class="scrolltop" @click="moveUp">
    <div class="scroll icon"><i class="fa fa-4x fa-angle-up"></i></div>
  </div>
  </div>
</template>
<script>

import { isMobile } from 'mobile-device-detect';

export default {
  name: 'App',
  components: {
    isMobile
  },
  data () {
    return {
      drawer: false,
      sidebarMenu: true,
      toggleMini: false,
      isMobile:isMobile,
      publicPages: ['/login','/registration','/register'],
      scrollPixels: 0
    };
  },
  created() {

    // this.authenticate();
    window.addEventListener('scroll', this.handleScroll);

    const favicon = document.getElementById("favicon");
    favicon.href = `/${import.meta.env.VITE_APP_NAME}_favicon.ico`;
    //favicon.href = "/" + import.meta.env.VITE_APP_NAME + "_favicon.ico";

  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('admin');
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('company');
      }

      return false;
    },
     mini: {
      get() {
         return this.toggleMini;            
      },
      set(value) {
         this.toggleMini = value;
      }
    },
    buttonText() {
        return !this.$vuetify.theme.dark ? 'Go Dark' : 'Go Light'
    }

  },
  methods: {
    /**
     * Gets called when the page refresh authetication fails
     * Deletes the localstorage token, clears the state and exists the UI
     * @public This is a public method
     */
    logOut() {
      this.$store.dispatch('auth/logout', this.$store.state.auth.user);
      this.$router.push('/login');
    },
    /**
     * Gets called when the page is Refreshed
     * Authenticates the existing token is valid and exists server side
     * @public This is a public method
     */
    authenticate() {

      if (localStorage.getItem('token')) {
          this.$store.dispatch('auth/authenticate', JSON.parse(localStorage.getItem('token'))).then(
            response => {
              if (this.currentUser) {
                localStorage.setItem('lang',this.currentUser.lang);
                this.$i18n.locale = this.currentUser.lang;
                // this.$router.push(permissions[this.currentUser.type].defaultroute);
              } 

              if (localStorage.getItem('lang')) {
                this.$i18n.locale = localStorage.getItem('lang');
              } else  {
                localStorage.setItem('lang','en');
                this.$i18n.locale = 'en';
              }
              
              if (_.get(response, 'status')) {
                
                if (response.status==='session_expired') {
                
                  this.logOut();      
                
                }

              } else {
                return response;
              }

            },
            error => {
              this.loading = false;
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );
        } 
        else if (!(this.$route.path==='/login')) {
          this.logOut();
        }
        else {

          if (localStorage.getItem('lang')) {
                this.$i18n.locale = localStorage.getItem('lang');
          } else  {
            localStorage.setItem('lang','en');
            this.$i18n.locale = 'en';
          }

        }
    },
    handleScroll() {
      this.scrollPixels = window.scrollY;
    },
    moveUp(){
      // window.scrollTo(0,0);

      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  
  }
}
</script>
<style lang="scss">
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

</style>
