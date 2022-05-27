import { createRouter, createWebHistory } from 'vue-router'
import i18n from '@/i18n'
import blankLayout from '@/components/layout/blank/index.vue';


const routes = [
{
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    meta: { 
      layout: blankLayout, 
      title: 'Home page'
    }
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
   
  document.title = to.meta.title || to.name;
  next();
  return;
   
});

export default router
