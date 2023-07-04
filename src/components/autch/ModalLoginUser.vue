<template>
  <base-modal
    :value='true'
    :show-header='false'
    max-width='350px'
    v-bind='attrs'
    :show-actions='false'
    @close='loginModalStore.setIsOpen(false)'
  >
    <p class='login-title'>Войти</p>

    <login-form
      @is-login='loginModalStore.setIsOpen(false)'
    />
  </base-modal>
</template>
<script lang="ts">
import {useAttrs, reactive} from 'vue'
import BaseModal from '@/components/modals/BaseModal.vue'
import LoginForm from './LoginForm.vue'

export const useLoginModal = reactive({
  getIsOpen() {
    return this.state.isOpen
  },

  setIsOpen(value: boolean) {
    this.state.isOpen = value
  },

  state: {
    isOpen: false,
  },
})
export default {
  name: 'ModalLoginUser',

  components: {
    BaseModal,
    LoginForm,
  },

  setup() {
    const attrs = useAttrs()
    const loginModalStore = useLoginModal


    return {
      attrs,
      loginModalStore,
    }
  },
}
</script>

<!--<script setup lang="ts">-->
<!--import {defineProps, defineEmits, useAttrs} from 'vue'-->
<!--import BaseModal from '@/components/modals/BaseModal.vue'-->
<!--import LoginForm from './LoginForm.vue'-->

<!--const attrs = useAttrs()-->
<!--const emits = defineEmits(['close'])-->
<!--</script>-->

<style lang="scss" scoped>
.login-title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 15px;
}
</style>
