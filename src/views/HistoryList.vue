<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../services/api'
import { useBookingStore } from '../stores/booking'
import HistoryItem from '../components/HistoryItem.vue'

const router = useRouter()
const store = useBookingStore()
const bookings = ref([])


const fetchHistory = async () => {
  try {
    bookings.value = await api.getBookings()
  } catch (error) {
    alert('ไม่สามารถดึงประวัติการจองได้')
  }
}

onMounted(fetchHistory)

const editBooking = (item) => {
  store.loadForEdit(item)
  router.push(`/booking/${item.rideId}`)
}

const deleteBooking = async (id) => {
  if (confirm('คุณต้องการยกเลิกและลบรายการนี้ใช่หรือไม่?')) {
    try {
      await api.deleteBooking(id)
      await fetchHistory() // รีโหลดข้อมูลใหม่ทันทีหลังลบสำเร็จ
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการลบข้อมูล')
    }
  }
}
</script>

<template>
  <h1>ประวัติการจองของคุณ</h1>
  <button @click="router.push('/rides')">กลับไปหน้าเครื่องเล่น</button>
  <hr>
  
  <div v-if="bookings.length === 0">
    <p>ยังไม่มีประวัติการทำรายการ</p>
  </div>
  
  <div v-else>
    <HistoryItem 
      v-for="item in bookings" 
      :key="item.id"
      :booking="item" 
      @edit="editBooking" 
      @delete="deleteBooking" 
    />
  </div>
</template>