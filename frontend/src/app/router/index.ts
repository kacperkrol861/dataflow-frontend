import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/onboarding',
  },
  {
    path: '/onboarding',
    component: () => import('@/modules/onboarding/OnboardingView.vue'),
  },
  {
    path: '/dashboard',
    component: () => import('@/modules/dashboard/DashboardView.vue'),
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})