<template>
  <div class='h-100 auth-wrap center white'>
    <div class='auth-form'>
      <h1
        v-if='title'
        class='text-center mb-24 auth-wrap-title'
      >
        {{ title }}
      </h1>

      <component
        :is='componentName'
      />
    </div>

    <footer class='auth-wrap-footer text-gray'>
      {{ copyright }}
    </footer>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AuthView',
}
</script>
<script setup lang='ts'>
import {computed} from 'vue'
import {useRoute} from 'vue-router'
import moment from 'moment'
import LoginForm from '../../components/autch/LoginForm.vue'

const route = useRoute()

const componentName = computed((): any => {
  let component = null
  switch (route.meta?.useComponent) {
    case ('LoginForm'): {
      component = LoginForm
    }
  }

  return component
})

const title = computed((): string => {
  switch(componentName.value) {
    case 'LoginForm':
      return 'Вход в личный кабинет'

    default:
      return ''
  }
})

const copyright = computed(() => {
  const baseYear = '2023'
  const currentYear = moment().format('YYYY')
  const year = currentYear === baseYear ? baseYear : `${baseYear}-${currentYear}`
  return `@ ${year} EasyShop`
})

</script>

<style lang='scss' scoped>
.auth-wrap {
  flex-direction: column;
  padding: 6% 30px 34px;
  position: relative;
  justify-content: flex-end;
}

.auth-content {
  flex: 1 0 auto;
}

.auth-wrap-title {
  font-size: 22px;
  line-height: 28px;
}

.auth-form {
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  width: 100%;
  max-width: 388px;
  justify-content: center;
}

.auth-wrap-alert {
  max-width: 760px;
}

.auth-wrap-footer {
  flex: 0 0 auto;
  display: flex;
  font-size: 14px;
}
</style>
