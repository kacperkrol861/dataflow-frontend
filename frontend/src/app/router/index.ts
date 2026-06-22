import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/onboarding/welcome',
  },

  {
    path: '/onboarding',
    component: () => import('@/app/layouts/OnboardingLayout.vue'),
    children: [
      {
        path: '',
        redirect: '/onboarding/welcome',
      },
      {
        path: 'welcome',
        component: () =>
          import('@/modules/onboarding/views/StepWelcome.vue'),
      },
      {
        path: 'connect',
        component: () =>
          import('@/modules/onboarding/views/StepConnect.vue'),
      },
      {
        path: 'configure',
        component: () =>
          import('@/modules/onboarding/views/StepConfigure.vue'),
      },
    ],
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})