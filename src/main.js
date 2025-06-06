import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

// Define a router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('./components/Index.vue') },
    { path: '/login', component: () => import('./components/Login.vue') },
    { path: '/checkmail', component: () => import('./components/CheckEmail.vue') },
    { path: '/verify/:token', component: () => import('./components/EmailVerification.vue') },
    { path: '/manage', component: () => import('./components/Manage.vue') },
    { path: '/student/dashboard', component: () => import('./components/StudentSelectPage.vue') },
    { path: '/:pathMatch(.*)*', component: () => import('./components/404.vue') },
    { path: '/submitted', component: () => import('./components/StudentSubmittedStage.vue') },
  ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')