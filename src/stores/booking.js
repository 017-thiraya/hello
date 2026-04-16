// src/stores/booking.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useBookingStore = defineStore('booking', () => {
  const currentBookingRide = ref(null)
  const bookingDate = ref('')
  const editingId = ref(null) 
  
  const tickets = ref({
    child: { label: 'เด็ก', price: 0, qty: 0, fastPassQty: 0 },
    adult: { label: 'ผู้ใหญ่', price: 0, qty: 0, fastPassQty: 0 },
    senior: { label: 'ผู้สูงอายุ', price: 0, qty: 0, fastPassQty: 0 }
  })

  const setTicketPrices = (ride) => {
    if (!ride) return
    tickets.value.child.price = Number(ride.childPrice) || 500
    tickets.value.adult.price = Number(ride.adultPrice) || 1000
    tickets.value.senior.price = Number(ride.seniorPrice) || 800
  }

  const totalTicketPrice = computed(() => {
    return Object.values(tickets.value).reduce((sum, t) => sum + (t.qty * t.price), 0)
  })

  const totalFastPassPrice = computed(() => {
    const fpPrice = Number(currentBookingRide.value?.fastPassPrice) || 0
    if (fpPrice <= 0) return 0 

    const totalFpQty = Object.values(tickets.value).reduce((sum, t) => sum + t.fastPassQty, 0)
    return totalFpQty * fpPrice
  })

  const netTotalPrice = computed(() => totalTicketPrice.value + totalFastPassPrice.value)

  const buildPayload = () => ({
    rideId: currentBookingRide.value?.id,
    rideName: currentBookingRide.value?.name,
    rideImage: currentBookingRide.value?.image,
    fastPassPrice: currentBookingRide.value?.fastPassPrice,
    bookingDate: bookingDate.value,
    totalPaid: netTotalPrice.value,
    details: JSON.parse(JSON.stringify(tickets.value)) // จำลองรายละเอียดทั้งหมด
  })

  const loadForEdit = (booking) => {
    editingId.value = booking.id
    bookingDate.value = booking.bookingDate
    currentBookingRide.value = { 
      id: booking.rideId, 
      name: booking.rideName, 
      image: booking.rideImage,
      fastPassPrice: booking.fastPassPrice 
    }
    
  
    if(booking.details) {
        tickets.value.child.qty = booking.details.child?.qty || 0
        tickets.value.child.fastPassQty = booking.details.child?.fastPassQty || 0
        tickets.value.adult.qty = booking.details.adult?.qty || 0
        tickets.value.adult.fastPassQty = booking.details.adult?.fastPassQty || 0
        tickets.value.senior.qty = booking.details.senior?.qty || 0
        tickets.value.senior.fastPassQty = booking.details.senior?.fastPassQty || 0
    }
  }

  const clearBooking = () => {
    editingId.value = null
    bookingDate.value = ''
    Object.values(tickets.value).forEach(t => { t.qty = 0; t.fastPassQty = 0 })
  }

  return { 
    currentBookingRide, bookingDate, tickets, editingId,
    totalTicketPrice, totalFastPassPrice, netTotalPrice, 
    buildPayload, clearBooking, setTicketPrices, loadForEdit
  }
})