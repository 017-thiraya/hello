<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBookingStore } from '../stores/booking'
import { api } from '../services/api'
import SuccessModal from '../components/SuccessModal.vue'

const router = useRouter()
const store = useBookingStore()

const showSuccess = ref(false)
const finalId = ref(null)
const isSubmitting = ref(false)


const confirmBooking = async () => {
  const payload = store.buildPayload()
  if (!payload) return

  isSubmitting.value = true
  try {
    let res
    if (store.editingId) {
      res = await api.updateBooking(store.editingId, payload)
    } else {
      res = await api.createBooking(payload)
    }

    if (res && res.id) {
      finalId.value = res.id
      showSuccess.value = true
    } else {
      throw new Error('ไม่พบรหัสอ้างอิงจากระบบ')
    }
  } catch (error) {
    console.error('Booking Error:', error)
    alert('ล้มเหลว: ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่')
  } finally {
    isSubmitting.value = false
  }
}

const handleFinish = () => {
  store.clearBooking() 
  router.push('/history')
}
</script>

<template>
  <div v-if="store.currentBookingRide">
    <h1>ตรวจสอบข้อมูลและชำระเงิน</h1>
    <div border="1">
      <p>วันที่เข้าใช้งาน: {{ store.bookingDate }}</p>
      <p>รายการ: {{ store.currentBookingRide?.name }}</p>
      <hr>
      <p>มูลค่าตั๋วรวม: {{ store.totalTicketPrice }} บาท</p>
      <p>มูลค่า Fast Pass รวม: {{ store.totalFastPassPrice }} บาท</p>
      <h2>ยอดสุทธิที่ต้องชำระ: {{ store.netTotalPrice }} บาท</h2>
    </div>

    <br>
    <button @click="router.go(-1)">ย้อนกลับ</button>
    <button @click="confirmBooking" :disabled="isSubmitting">
      {{ isSubmitting ? 'กำลังดำเนินการ...' : 'ยืนยันการทำรายการ' }}
    </button>

    <SuccessModal 
      v-if="showSuccess" 
      :bookingId="finalId" 
      :total="store.netTotalPrice" 
      @close="handleFinish" 
    />
  </div>
</template>