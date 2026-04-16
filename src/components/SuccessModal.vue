<script setup>
defineProps(['bookingId', 'total'])
defineEmits(['close'])
</script>

<template>
  <div>
    <div style="background: white; padding: 20px; border: 2px solid green;">
      <h2>จองสำเร็จ!</h2>
      <p>รหัสการจอง: BK-{{ bookingId }}</p>
      <p>ยอดเงินรวม: {{ total }} บาท</p>
      <button @click="$emit('close')">กลับไปหน้าประวัติ</button>
    </div>
  </div>
</template>