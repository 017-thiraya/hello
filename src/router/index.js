import { createRouter, createWebHistory } from 'vue-router'
import RideList from '../views/RideList.vue'
import Booking from '../views/Booking.vue'
import CheckoutSummary from '../views/CheckoutSummary.vue'
import HistoryList from '../views/HistoryList.vue'

const routes = [
  { path: '/', redirect: '/rides' },
  { path: '/rides', component: RideList },
  { path: '/booking/:id', component: Booking },
  { path: '/checkout', component: CheckoutSummary },
  { path: '/history', component: HistoryList }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router