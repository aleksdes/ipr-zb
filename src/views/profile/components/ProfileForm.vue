<template>
  <v-form
    v-model='valid'
    class='login-form'
  >
    <div class='login-form__box-fields'>
      <template
        v-for='fieldItem in formField'
      >
        <Field
          v-if='fieldItem.id==="gender"'
          :key='fieldItem.id'
          v-slot='{ field }'
          v-model='dataFormUser[fieldItem.id]'
          :rules='fieldItem.rules'
          :name='fieldItem.id'
        >
          <div>
            <p class='text-subtitle-2 text-grey-darken-1'>Пол</p>

            <v-btn-toggle
              :model-value='dataFormUser.gender'
              color='orange-accent-3'
              v-bind='field'
            >
              <v-btn
                value='female'
                :class='{"text-white": dataFormUser.gender === "female"}'
              >
                <span class='fs-20'>Ж</span>
              </v-btn>

              <v-btn
                value='male'
                :class='{"text-white": dataFormUser.gender === "male"}'
              >
                <span class='fs-20'>М</span>
              </v-btn>
            </v-btn-toggle>
          </div>
        </Field>

        <Field
          v-else
          :key='fieldItem.id'
          v-slot='{ errors, field }'
          v-model='dataFormUser[fieldItem.id]'
          :rules='fieldItem.rules'
          :name='fieldItem.id'
        >
          <v-text-field
            :model-value='dataFormUser[fieldItem.id]'
            v-bind='field'
            :label='fieldItem.label'
            :placeholder='fieldItem.label'
            clearable
            hide-details
            :error-messages='errors'
            density='comfortable'
            variant='outlined'
            class='mb-3'
          />
        </Field>
      </template>
    </div>

    <div class='mb-2'>
      <b>Информационные сообщения</b>
      <v-switch
        v-model='dataFormUser.infoMessages'
        hide-details
        color='orange-lighten-1'
        inset
        label='Получать информационные сообщения на E-mail'
      />
    </div>


    <b>Скидки и предложения</b>
    <v-switch
      v-model='dataFormUser.infoSMS'
      hide-details
      color='orange-lighten-1'
      inset
      label='Получать информацию о скидках, новинках и выгодных предложениях по смс'
    />
    <v-switch
      v-model='dataFormUser.infoEmail'
      hide-details
      color='orange-lighten-1'
      inset
      label='Получать информацию о скидках, новинках и выгодных предложениях на E-mail'
    />

    <v-btn
      class='login-form__btn text-white text-initial fw-6 ml-auto d-flex mt-5'
      color='orange-lighten-1'
      height='40'
      elevation='0'
      :disabled='!meta.valid'
    >
      Сохранить
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent ({
  name: 'ProfileForm',
})
</script>

<script setup lang="ts">
import {onMounted, ref, computed, ComputedRef} from 'vue'
import {useForm, Field} from 'vee-validate'
const { meta } = useForm()
import useUserStore from '@/store/user'
import {User} from '@/types/user'

const valid = ref(false)

const userStore = useUserStore()
const dataFormUser: any = ref({
  infoMessages: false,
  infoSMS: false,
  infoEmail: false,
})

const user: ComputedRef<User> = computed((): User => {
  const dataUser: User = userStore.getUserData
  return dataUser
})

const formField = [
  {id: 'email', rules: 'required', label: 'Email'},
  {id: 'phone', rules: 'required', label: 'Телефон'},
  {id: 'username', rules: 'required', label: 'Никнейм'},
  {id: 'firstName', rules: '', label: 'Имя'},
  {id: 'lastName', rules: '', label: 'Фамилия'},
  {id: 'age', rules: 'integer|max_value:100', label: 'Возраст'},
  {id: 'gender', rules: '', label: 'Пол', type: 'gender'},
]
onMounted(() => {
  dataFormUser.value = user.value
})
</script>

<style lang="scss" scoped>
.login-form {
  &__box-fields {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    margin-bottom: 15px;

    @media (min-width: 600px) {
      grid-template-columns: repeat(2, 1fr);
      grid-column-gap: 15px;
    }
  }

  :deep .v-switch .v-selection-control {
    align-items: flex-start;
    min-height: auto;
  }
}
</style>
