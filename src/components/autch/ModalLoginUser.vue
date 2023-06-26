<template>
  <base-modal
    :value='true'
    :show-header='false'
    max-width='350px'
    v-bind='attrs'
    :show-actions='false'
    @close='emits("close")'
  >
    <p class='login-title'>Войти</p>
    <LoginForm />
  </base-modal>
</template>
<script lang="ts">
export default {
  name: 'ModalLoginUser',
}
</script>

<script setup lang="ts">
import {defineProps, defineEmits, useAttrs} from 'vue'
import BaseModal from '@/components/modals/BaseModal.vue'
import LoginForm from './LoginForm.vue'

const attrs = useAttrs()
const emits = defineEmits(['close'])
</script>

<style lang="scss" scoped>
.login-title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 8px;
}
</style>
