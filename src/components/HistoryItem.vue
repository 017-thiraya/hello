<script setup>
defineProps(['booking'])
defineEmits(['edit', 'delete'])
</script>

<template>
  <div border="1">
    <p><strong>ID: BK-{{ booking.id }}</strong></p>
    <p>เครื่องเล่น: {{ booking.rideName }}</p>
    <p>วันที่ใช้งาน: {{ booking.bookingDate }}</p>

    <div v-if="booking.items && booking.items.length > 0">
      <p><strong>รายการ:</strong></p>

      <div v-for="(item, index) in booking.items" :key="index">
        <p v-if="item.qty > 0">
          {{ item.name }} x {{ item.qty }} = {{ item.price * item.qty }} บาท
        </p>
      </div>
    </div>

    <p><strong>ยอดชำระ: {{ booking.totalPaid }} บาท</strong></p>

    <button @click="$emit('edit', booking)">แก้ไข</button>
    <button @click="$emit('delete', booking.id)">ลบ</button>

    <hr>
  </div>
</template>