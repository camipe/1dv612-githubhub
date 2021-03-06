import auth0 from 'auth0-js';
import Vue from 'vue';

// auth setup following https://www.storyblok.com/tp/how-to-auth0-vuejs-authentication

const webAuth = new auth0.WebAuth({
  domain: 'mipe.eu.auth0.com',
  clientID: '3aw6Y4lbT7jj1awt7CeCsAfSBTI3bvnt',
  redirectUri: `${process.env.BASE_URL}/callback`,
  responseType: 'token id_token',
  scope: 'openid profile',
});

const auth = new Vue({
  computed: {
    token: {
      get() {
        return localStorage.getItem('id_token');
      },
      set(idToken) {
        localStorage.setItem('id_token', idToken);
      },
    },
    accessToken: {
      get() {
        return localStorage.getItem('access_token');
      },
      set(accessToken) {
        localStorage.setItem('access_token', accessToken);
      },
    },
    expiresAt: {
      get() {
        return localStorage.getItem('expires_at');
      },
      set(expiresIn) {
        const expiresAt = JSON.stringify((expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('expires_at', expiresAt);
      },
    },
    user: {
      get() {
        return JSON.parse(localStorage.getItem('user'));
      },
      set(user) {
        localStorage.setItem('user', JSON.stringify(user));
      },
    },
  },
  methods: {
    login() {
      webAuth.authorize({
        connection: 'github',
        connection_scope: 'user admin:org_hook read:org repo', // github api scope requested
      });
    },
    logout() {
      // eslint-disable-next-line
      return new Promise((resolve, reject) => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        localStorage.removeItem('user');
      });
    },
    isAuthenticated() {
      return new Date().getTime() < this.expiresAt;
    },
    handleAuthentication() {
      return new Promise((resolve, reject) => {
        webAuth.parseHash((err, authResult) => {
          console.log(authResult);
          if (authResult && authResult.accessToken && authResult.idToken) {
            console.log(2);
            this.expiresAt = authResult.expiresIn;
            this.accessToken = authResult.accessToken;
            this.token = authResult.idToken;
            this.user = authResult.idTokenPayload;
            resolve();
          } else if (err) {
            console.log(1);
            this.logout();
            reject(err);
          }
        });
      });
    },
  },
});

export default {
  install() {
    Vue.prototype.$auth = auth;
  },
};
