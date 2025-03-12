import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import BookDetails from '@/pages/BookDetails.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import AuthCallBack from '@/pages/AuthCallBack.vue'
import ShelfDetails from '@/pages/ShelfDetails.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/book/:id', component: BookDetails, name: 'book-details' },
  { path: '/profile', component: ProfilePage },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/auth/callback', component: AuthCallBack },
  { path: '/shelf/:id', component: ShelfDetails, name: 'shelf-details', props: true },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
