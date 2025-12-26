import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Dashboard from '@/components/Dashboard.vue'
import WeightCom from '@/components/WeightCom.vue'
import Bodymeasurements from '@/components/Bodymeasurements.vue'
import AddDiet from '@/components/AddDiet.vue'
import WeightNote from '@/components/WeightNote.vue'
import AddWorkouts from '@/components/AddWorkouts.vue'
import Loginpage from '@/components/Loginpage.vue'
import signInPage from '@/components/signInPage.vue'
import Step1 from '@/components/Step1.vue'
import fitnessdetails from '@/components/step2.vue'
import diet from '@/components/myDiets.vue'
import indvidualDiet from '@/components/indvidualDiet.vue'
import workouts from '@/components/MyWorkouts.vue'
import IndividualWorkout from '@/components/IndividualWorkout.vue'
import workoutCalender from '../components/workoutCalender.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Loginpage',
      component: Loginpage,
    },
    {
      path: '/calenderworkout',
      name: 'workoutCalender',
      component: workoutCalender,
    },
    {
      path: '/signup',
      name: 'signInPage',
      component: signInPage,
    },
    {
      path: '/personalDetails',
      name: 'Step1',
      component: Step1,
    },
    {
      path: '/fitnessdetails',
      name: 'fitnessdetails',
      component: fitnessdetails,
    },
    {
      path: '/indvidualDiet',
      name: 'indvidualDiet',
      component: indvidualDiet,
    },
    {
      path: '/IndividualWorkout',
      name: 'IndividualWorkout',
      component: IndividualWorkout,
    },
    {
      path: '/workout',
      name: 'workouts',
      component: workouts,
    },
    {
      path: '/diet',
      name: 'diet',
      component: diet,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: '/weight',
      name: 'Weight',
      component: WeightCom,
    },
    {
      path: '/measurements',
      name: 'Bodymeasurements',
      component: Bodymeasurements,
    },
    {
      path: '/addweight',
      name: 'WeightNote',
      component: WeightNote,
    },
    {
      path: '/addDiet',
      name: 'AddDiet',
      component: AddDiet,
    },
    {
      path: '/addworkouts',
      name: 'AddWorkouts',
      component: AddWorkouts,
    },
  ],
})

export default router
