<template>
  <section class='wrapper'>
    <div class='container'>
      <div
        id='scene'
        class='scene'
        data-hover-only='false'
      >
        <div
          data-depth='0.6'
          class='circle circle-1'
        />
        <div
          data-depth='0.4'
          class='circle circle-2'
        />
        <div
          data-depth='0.2'
          class='circle circle-3'
        />
        <p
          data-depth='0.2'
          class='p404'
        >
          404
        </p>
        <p class='p404'>404</p>
      </div>
    </div>
  </section>

</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CircleBurger',
})
</script>

<script setup lang="ts">
import {onMounted} from 'vue'
import Parallax from 'parallax-js'

onMounted(() => {
  const scene = document.getElementById('scene')
  new Parallax(scene)
})
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Barlow+Condensed:300,400,500,600,700,800,900|Barlow:300,400,500,600,700,800,900&display=swap');

$bg-02: #263238;
$bg-03: #4d5b62;
$circleShadow: inset 5px 20px 40px rgba($bg-02, 0.25), inset 5px 0px 5px rgba($bg-03, 0.3),
  inset 5px 5px 20px rgba($bg-03, 0.25), 2px 2px 5px rgba(white, 0.2);

@mixin sm {
  @media screen and (max-width: 799px) {
    @content;
  }
}

@mixin height {
  @media screen and (max-height: 660px) {
    @content;
  }
}

.wrapper {
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow-x: hidden;

  .container {
    margin: 0 auto;
    transition: all 0.4s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    // Scene for the Parallax Effect
    .scene {
      position: absolute;
      width: 100vw;
      height: 100vh;
      vertical-align: middle;
    }

    // All elements' containers
    .one,
    .circle-1,
    .circle-2,
    .circle-3,
    .p404 {
      width: 60%;
      height: 60%;
      top: 20% !important;
      left: 20% !important;
      min-width: 400px;
      min-height: 400px;

      @include sm {
        width: 90%;
        height: 90%;
        top: 5% !important;
        left: 5% !important;
        min-width: 280px;
        min-height: 280px;
      }

      @include height {
        min-width: 280px;
        min-height: 280px;
        width: 60%;
        height: 60%;
        top: 20% !important;
        left: 20% !important;
      }
    }

    // The 404 Number
    .p404 {
      font-size: 150px;
      font-weight: 700;
      letter-spacing: 4px;
      color: white;
      display: flex !important;
      justify-content: center;
      align-items: center;
      position: absolute;
      z-index: 2;
      animation: anime404 0.6s cubic-bezier(0.3, 0.8, 1, 1.05) both;
      animation-delay: 1.2s;

      @include sm {
        font-size: 100px;
      }

      @keyframes anime404 {
        0% {
          opacity: 0;
          transform: scale(10) skew(20deg, 20deg);
        }
      }

      &:nth-of-type(2) {
        color: $bg-02;
        z-index: 1;
        animation-delay: 1s;
        filter: blur(10px);
        opacity: 0.8;
      }
    }

    .circle {
      position: absolute;

      &:before {
        content: '';
        position: absolute;
        border-radius: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        box-shadow: $circleShadow;
      }
    }

    .circle-1:before {
      width: 700px;
      height: 700px;
      background-color: rgba($bg-02, 0.3);
      animation: circle 0.8s cubic-bezier(1, 0.06, 0.25, 1) backwards;

      @keyframes circle {
        0% {
          width: 0;
          height: 0;
        }
      }

      @include sm {
        width: 600px;
        height: 600px;
      }
    }

    .circle-2:before {
      width: 550px;
      height: 550px;
      background-color: rgba($bg-02, 0.2);
      animation: circle 0.8s 0.4s cubic-bezier(1, 0.06, 0.25, 1) backwards;

      @keyframes circle {
        0% {
          width: 0;
          height: 0;
        }
      }

      @include sm {
        width: 550px;
        height: 550px;
      }
    }

    .circle-3:before {
      width: 400px;
      height: 400px;
      background-color: rgba($bg-02, 0.1);
      animation: circle 0.8s 0.6s cubic-bezier(1, 0.06, 0.25, 1) backwards;

      @keyframes circle {
        0% {
          width: 0;
          height: 0;
        }
      }

      @include sm {
        width: 300px;
        height: 300px;
      }
    }
  }
}
</style>
