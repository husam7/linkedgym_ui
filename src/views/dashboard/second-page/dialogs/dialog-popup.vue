<script setup>
import { ref } from 'vue'
const isDialog = ref(false)

   const props = defineProps({
    num: Number
 })
 const emit = defineEmits(['add'])
 const close = () => {
   emit('add');
   isDialog.value = false
}

</script>

<template>
      <v-btn
      color="primary"
      @click="isDialog = true"
    >
      Open Dialog
    </v-btn>
  <div class="text-center">
      <v-dialog
      v-model="isDialog"
      >
        <v-card>
          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </v-card-text>
          <v-card-text>
            {{ num }}
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" block @click="close()">Close Dialog</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </div>
</template>
