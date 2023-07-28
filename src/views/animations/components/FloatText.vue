<template>
  <div class='float-text'>
    <p ref='target'>Red Bull Gives You Wings</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent ({
  name: 'FloatText',
})
</script>

<script setup lang="ts">
import {onMounted, ref} from 'vue'

const target = ref(null)

const parseTargetText = () => {
  if (!target.value) return
  let text = target.value.innerHTML,
    chars = text.length,
    newText = ''

  for (let i = 0; i < chars; i ++) {
    newText += '<i>' + text.charAt(i) + '</i>'
  }

  target.value.innerHTML = newText
}

function textEffect(animationName: string) {
  if (!target.value) return
  let wrappedChars = target.value.getElementsByTagName('i'),
    wrappedCharsLen = wrappedChars.length,
    j = 0

  function addEffect () {
    setTimeout(() => {
      wrappedChars[j].className = animationName
      j ++
      if (j < wrappedCharsLen) {
        addEffect()
      }
    }, 100)
  }

  addEffect()
}

onMounted(() => {
  parseTargetText()
  textEffect('fly-in-out')
})
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Syncopate");

.float-text {
  * {
    -webkit-font-smoothing: antialiased;
    font-family: 'Syncopate', Helvetica, Arial;
    text-transform: uppercase;
    margin: 0;
  }

  p {
    text-align: center;
    vertical-align: middle;
    font-size: 2em;
    line-height: 2em;
    font-weight: 700;
  }

  i {
    display: inline-block;
    font-style: normal;
    padding: 0 0.25em;
    transform: scale(0) translate3d(0, -400px, 0);
    background: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
  }

  i.fly-in-out {
    animation: fly-in-out 6s infinite ease-in-out;
  }

  @keyframes fly-in-out {
    0% {
      transform: scale(0) translate3d(0, -400px, 0);
      background: rgba(0, 0, 0, 0.3);
      box-shadow: 0 0 50px 50px rgba(0, 0, 0, 0.2);
      border-radius: 50%;
    }
    5%, 95% {
      color: rgba(0, 0, 0, 0.8);
      text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
      transform: scale(1) translate3d(0, 0, 0);
      background: transparent;
      box-shadow: none;
    }
    100% {
      color: transparent;
      transform: scale(0) translate3d(0, 400px, 0);
      background: rgba(0, 0, 0, 0.3);
      box-shadow: 0 0 50px 50px rgba(0, 0, 0, 0.2);
      border-radius: 50%;
    }
  }
}
</style>
