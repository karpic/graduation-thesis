import Vue from 'vue'
import VueRouter from 'vue-router';
import { routes } from './routes';

Vue.use(VueRouter);

export const router = new VueRouter({
    mode: 'history',
    routes
  });
  
router.beforeEach((to, from, next) => { 
    const publicPages = ['/signin'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    if(authRequired && !loggedIn) {
        next('/signin');
    }

    next();
});
 
