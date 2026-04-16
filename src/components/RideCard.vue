<script setup>
defineProps(['ride'])
defineEmits(['book'])
</script>

<template>
  <div>
    <img :src="ride.image" width="200">
    <h3>{{ ride.name }}</h3>
    <p>{{ ride.description }}</p>
    <p>ค่า Fast Pass: {{ ride.fastPassPrice }} บาท</p>
    <button @click="$emit('book', ride.id)">เลือกจองเครื่องเล่นนี้</button>
  </div>
</template>