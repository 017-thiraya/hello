<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../services/api'
import RideCard from '../components/RideCard.vue'

const router = useRouter()
const rides = ref([])

onMounted(async () => {
  try {
    console.log('กำลังดึงข้อมูลเครื่องเล่น...') // เช็คว่าโค้ดเริ่มทำงานไหม
    const responseData = await api.getRides()
    
    console.log('ข้อมูลที่ได้จาก API: ', responseData) // ดูว่าได้ข้อมูลอะไรมา
    rides.value = responseData
    
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error) // โชว์ Error สีแดงให้เห็นชัดๆ
    alert('ไม่สามารถดึงข้อมูลเครื่องเล่นได้ กรุณาเช็ค Backend')
  }
})

const goBooking = (id) => router.push(`/booking/${id}`)
</script>

<template>
  <h1>เลือกเครื่องเล่น</h1>
  <div v-for="ride in rides" :key="ride.id">
    <RideCard :ride="ride" @book="goBooking" />
  </div>
</template>