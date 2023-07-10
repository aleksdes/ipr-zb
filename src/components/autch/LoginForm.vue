<template>
  <v-form
    v-model='valid'
    class='login-form'
  >
    <Field
      v-slot='{ errors, field }'
      v-model='email'
      rules='required'
      name='логин'
    >
      <v-text-field
        :model-value='email'
        v-bind='field'
        label='Логин'
        placeholder='Логин'
        required
        clearable
        :error-messages='errors'
        dense
        variant='outlined'
        class='mb-3'
      />
    </Field>

    <Field
      v-slot='{ errors, field }'
      v-model='password'
      rules='required|min:4'
      name='пароль'
    >
      <v-text-field
        :model-value='password'
        v-bind='field'
        label='Пароль'
        placeholder='Пароль'
        required
        dense
        variant='outlined'
        clearable
        :error-messages='errors'
        :append-inner-icon='passwordIsVisible ? "mdi-eye" : "mdi-eye-off"'
        :type='passwordIsVisible ? "text" : "password"'
        @click:append-inner='passwordIsVisible = !passwordIsVisible'
      />
    </Field>

    <v-btn
      class='login-form__btn text-white w-100 text-initial fw-6'
      color='orange-lighten-1'
      height='40'
      elevation='0'
      :disabled='!meta.valid'
      @click='sendLogin'
    >
      Вход
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent ({
  name: 'LoginForm',
})
</script>

<script setup lang='ts'>
import {defineEmits, ref} from 'vue'
import {useRouter} from 'vue-router'
import Auth from '@/assets/js/helpers/auth'
import {useForm, Field} from 'vee-validate'
import { notify } from '@/assets/js/helpers/useNotify'
import {useLoginModal} from '@/components/autch/ModalLoginUser.vue'
const emits = defineEmits(['isLogin'])
const { meta } = useForm()

const email = ref('kminchelle')
const password = ref('0lelplR')
const valid = ref(false)
const passwordIsVisible = ref(false)
const loginModalStore = useLoginModal
const router = useRouter()

const sendLogin = async () => {
  if (!meta.value.valid) return
  const dataLogin = {
    username: email.value,
    password: password.value,
  }

  const { errors }: any = await Auth.login(dataLogin)

  if (errors) {
    let notifyMessage = ''
    const status = errors?.response?.status

    if (status === 422 || status === 400) {
      notifyMessage = 'Неверный логин или пароль'
    } else {
      notifyMessage = 'Неизвестная ошибка. Попробуйте позже'
    }

    notify({ text: notifyMessage })
  } else {
    loginModalStore.setIsOpen(false)
  }
}
</script>

<style lang="scss" scoped>
.login-form {
  &__btn {
    display: flex;
    width: 100%;
    margin: 8px auto;
    max-width: inherit;
  }
}
</style>
