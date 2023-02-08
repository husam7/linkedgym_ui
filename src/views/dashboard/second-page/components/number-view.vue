<script setup>
import { ref } from 'vue'

const props = defineProps({
    num: Number
 })
</script>
<template>
  <div>{{ num }}</div>
</template>

