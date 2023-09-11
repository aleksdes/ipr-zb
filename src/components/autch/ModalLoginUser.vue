<template>
  <base-modal
    :value='true'
    :show-header='false'
    max-width='350px'
    v-bind='attrs'
    :show-actions='false'
    @close='loginModalStore.setIsOpen(false)'
  >
    <p
      class='login-title'
    >
      Войти
    </p>

    <login-form />
  </base-modal>
</template>
<script lang="ts">
import {useAttrs, reactive, defineComponent} from 'vue'
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

export default defineComponent({
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
})
</script>

<style lang="scss" scoped>
.login-title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 15px;
}
</style>
