<template>
  <div ref='target'
       class='container'>
    <p class='random-bubble-text'>Happy Birthday to You</p>
  </div>
  >
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RandomBubble',
})
</script>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const countInstance = ref(8)
const timeoutTime = ref(5000)
const intervalTime = ref(500)
const target = ref(null)
const interval: any = ref([])
const widthContainer = ref(0)
const heightContainer = ref(0)
const maxVisibleBubble = ref(100)

watch(maxVisibleBubble, () => {
  if (maxVisibleBubble.value <= 1) {
    interval.value = interval.value.map((item: any) => clearInterval(item))
    interval.value = []
    maxVisibleBubble.value = 100
    setRandomBubble()
  }
})

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

const setRandomBubble = () => {
  for (let i = 0; i <= countInstance.value; i++) {
    interval.value.push(null)
  }
  interval.value = interval.value.map((item: any) => {
    return setInterval(() => {
      if (target.value) {
        const X = getRandomInt(0, widthContainer.value)
        const Y = getRandomInt(0, heightContainer.value)

        const i = document.createElement('i')
        i.className = 'bubble'
        i.style.top = Y + 'px'
        i.style.left = X + 'px'
        i.style.animation = `pulse_${getRandomInt(1, 4)} ${getRandomInt(1, timeoutTime.value / 1000 + 1)}s ease-in-out`

        maxVisibleBubble.value--
        target.value.append(i)
        setTimeout(() => i.remove(), timeoutTime.value)
      }
    }, intervalTime.value)
  })
}

onMounted(() => {
  if (!target.value) return
  const { width, height } = target.value.getBoundingClientRect()
  widthContainer.value = width
  heightContainer.value = height

  setRandomBubble()
})
</script>

<style lang="scss">
.container {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bubble {
  position: absolute;
  background-color: rgba(0, 0, 0, 0);
  border-radius: 100%;
  width: 0px;
  height: 0px;
  z-index: 2;
  transition: all 5s;
  transform: translate(-50%, -50%);
}

.random-bubble-text {
  font-size: 80px;
  color: #03ffe6;
  font-weight: 700;
}

@keyframes pulse_1 {
  0% {
    width: 0px;
    height: 0px;
    background-color: rgb(30%, 2%, 100%, 0.1);
  }
  100% {
    width: 350px;
    height: 350px;
    background-color: rgba(0, 0, 0, 0);
  }
}

@keyframes pulse_2 {
  0% {
    width: 0px;
    height: 0px;
    background-color: rgba(5, 255, 59, 0.1);
  }
  100% {
    width: 150px;
    height: 150px;
    background-color: rgba(0, 0, 0, 0);
  }
}

@keyframes pulse_3 {
  0% {
    width: 0px;
    height: 0px;
    background-color: rgba(255, 5, 5, 0.1);
  }
  100% {
    width: 80px;
    height: 80px;
    background-color: rgba(0, 0, 0, 0);
  }
}
</style>
