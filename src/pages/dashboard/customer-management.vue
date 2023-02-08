<template>
  <div>
    <VCard title="Create Awesome 🙌">
      <VCardText>This is your second page.</VCardText>
      <VCardText>
        Chocolate sesame snaps pie carrot cake pastry pie lollipop muffin.
        Carrot cake dragée chupa chups jujubes. Macaroon liquorice cookie
        wafer tart marzipan bonbon. Gingerbread jelly-o dragée
        chocolate.
      </VCardText>
    </VCard>
<number-view :num="num"></number-view>
    <dialogPopup @add = "plusOne" :num="num"></dialogPopup>
  </div>
</template>

<script setup>
import dialogPopup from '@/views/dashboard/customer-management/dialogs/dialog-popup.vue';
import numberView from '@/views/dashboard/customer-management/components/number-view.vue';
import { ref } from 'vue'

const num = ref(0)
const plusOne = () => {num.value++}
</script>
