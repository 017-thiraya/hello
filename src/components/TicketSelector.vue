<script setup>
const props = defineProps(['label', 'ticket', 'fastPassPrice'])
const emit = defineEmits(['updateQty', 'updateFp'])

const changeQty = (val) => {
  const newQty = Math.max(0, val)
  emit('updateQty', newQty)
  if (props.ticket.fastPassQty > newQty) emit('updateFp', newQty)
}

const changeFp = (val) => {
  const newFp = Math.max(0, Math.min(val, props.ticket.qty))
  emit('updateFp', newFp)
}
</script>

<template>
  <fieldset>
    <legend>{{ label }} ({{ ticket.price }} บาท)</legend>
    <div>
      จำนวนตั๋ว: 
      <button @click="changeQty(ticket.qty - 1)">-</button>
      <span> {{ ticket.qty }} </span>
      <button @click="changeQty(ticket.qty + 1)">+</button>
    </div>
    <div v-if="fastPassPrice > 0">
      เพิ่ม Fast Pass (+{{ fastPassPrice }}บ.): 
      <button @click="changeFp(ticket.fastPassQty - 1)">-</button>
      <span> {{ ticket.fastPassQty }} </span>
      <button @click="changeFp(ticket.fastPassQty + 1)">+</button>
    </div>
  </fieldset>
</template>