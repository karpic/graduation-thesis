import Vue from 'vue'
import VueRouter from 'vue-router';
import { routes } from './routes';
import store from './store/store';

Vue.use(VueRouter);

export const router = new VueRouter({
    mode: 'history',
    routes
  });
  
  router.beforeEach((to, from, next) => { 
    let signedIn = store.getters.isSignedIn;
    if (to.matched.some(record => record.meta.requiresAuth)) { 
        if (!signedIn) { 
            next({ 
                path: '/signin', 
                query: { redirect: to.fullPath } 
            }) 
        } else { 
            next();
        } 
    } else { 
        next();
    } 
  });

