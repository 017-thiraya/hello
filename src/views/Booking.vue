<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBookingStore } from '../stores/booking'
import { api } from '../services/api'
import TicketSelector from '../components/TicketSelector.vue'

const route = useRoute()
const router = useRouter()
const store = useBookingStore()


const today = new Date().toISOString().split('T')[0]

onMounted(async () => {
  if (!store.editingId) {
    const rideId = route.params.id
    if (!rideId) return router.push('/rides')
    
    try {
      const rideData = await api.getRideById(rideId)
      if (rideData) {
        store.currentBookingRide = rideData
        store.setTicketPrices(rideData) // อัปเดตราคาตั๋วจาก API ทันที
      }
    } catch (e) {
      console.error(e)
      alert('ดึงข้อมูลเครื่องเล่นไม่สำเร็จ')
      router.replace('/rides')
    }
  }
})

const validateAndProceed = () => {
  if (!store.bookingDate) {
    return alert('กรุณาระบุวันที่ต้องการเข้าเล่น')
  }
  if (store.bookingDate < today) {
    return alert('ไม่สามารถทำรายการย้อนหลังได้')
  }
  
  const totalQty = Object.values(store.tickets).reduce((sum, t) => sum + t.qty, 0)
  if (totalQty === 0) {
    return alert('กรุณาเลือกตั๋วอย่างน้อย 1 ใบ')
  }
  
  router.push('/checkout')
}
</script>

<template>
  <div v-if="store.currentBookingRide">
    <h1>จอง: {{ store.currentBookingRide.name }}</h1>
    
    <h3>1. เลือกวันที่</h3>
    <input type="date" v-model="store.bookingDate" :min="today">

    <h3>2. เลือกจำนวนตั๋ว</h3>
    <TicketSelector 
      v-for="(t, key) in store.tickets" 
      :key="key"
      :label="t.label"
      :ticket="t"
      :fastPassPrice="Number(store.currentBookingRide.fastPassPrice) || 0"
      @updateQty="(val) => t.qty = val"
      @updateFp="(val) => t.fastPassQty = val"
    />
    <br>
    <button @click="router.go(-1)">ย้อนกลับ</button>
    <button @click="validateAndProceed">ไปหน้าสรุปยอด</button>
  </div>
</template>