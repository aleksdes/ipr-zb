<template>
  <div class='button-share'>
    <div
      class='main-button share-alt'
      @click='openSocial = !openSocial'
    >
      <div class='mdi mdi-share-variant'/>
    </div>

    <div class='button-content'>
      <div
        v-for='item in social'
        :key='item.id'
        :class='["branch", openSocial ? "open" : "no-animation"]'
      >
        <div
          :id='item.id'
          class='node'
        >
          <div :class='["share-alt-icon", item.icon]'/>
        </div>
      </div>
    </div>
  </div>

  <div class='button-messenger'>
    <div
      class='main-button social'
      @click='openMessenger = !openMessenger'
    >
      <div class='mdi mdi-comment-processing-outline'/>
    </div>

    <div class='button-content'>
      <div
        :class='["container", openMessenger ? "open" : "no-animation"]'
      >
        <div
          v-for='item in messenger'
          :key='item.id'
          class='segment'
        >
          <div :class='["social-icon", item.icon]'/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ShareBtn',
})
</script>

<script setup lang="ts">
import {ref} from 'vue'

const social = [
  {id: 'facebook', icon: 'mdi mdi-facebook' },
  {id: 'linkedin', icon: 'mdi mdi-linkedin' },
  {id: 'google-plus', icon: 'mdi mdi-google-plus' },
  {id: 'pinterest', icon: 'mdi mdi-pinterest' },
  {id: 'twitter', icon: 'mdi mdi-twitter' },
]

const messenger = [
  {id: 'phone', icon: 'mdi mdi-phone' },
  {id: 'whatsapp', icon: 'mdi mdi-whatsapp' },
  {id: 'send-circle', icon: 'mdi mdi-send-circle' },
  {id: 'gmail', icon: 'mdi mdi-gmail' },
]

const openSocial = ref(false)
const openMessenger= ref(false)
</script>

<style lang="scss" scoped>
/* Variables */
$background-grey: #292929;
$dropbox: #007ee5;
$facebook: #3b5998;
$flickr: #ff0084;
$google-plus: #dd4b39;
$linkedin: #007bb5;
$instagram: #e95950;
$pinterest: #cb2027;
$snapchat: #fffc00;
$twitter: #55acee;
$vine: #00bf8f;
$whatsapp: #4dc247;
$youtube: #bb0000;

/* Mixins */
@mixin flex-container($display, $direction, $wrap, $justify, $items, $content) {
  display: $display;
  flex-direction: $direction;
  flex-wrap: $wrap;
  justify-content: $justify;
  align-items: $items;
  align-content: $content;
  -webkit-display: "-webkit-#{$display}";
  -webkit-flex-direction: $direction;
  -webkit-flex-wrap: $wrap;
  -webkit-justify-content: $justify;
  -webkit-align-items: $items;
  -webkit-align-content: $content;
}

@mixin flex-item($align-self: auto, $basis: auto, $grow: 0, $order: 0) {
  flex-basis: $basis;
  flex-grow: $grow;
  order: $order;
  align-self: $align-self;
  -webkit-flex-basis: $basis;
  -webkit-flex-grow: $grow;
  -webkit-order: $order;
  -webkit-align-self: $align-self;
}

@mixin position($position, $top: null, $right: null, $bottom: null, $left: null) {
  position: $position;
  top: $top;
  right: $right;
  bottom: $bottom;
  left: $left;
}

@mixin absolute($args...) {
  @include position(absolute, $args...);
}

@mixin relative($args...) {
  @include position(relative, $args...);
}

@mixin fixed($args...) {
  @include position(fixed, $args...);
}

@mixin keyframes($animation-name) {
  @-webkit-keyframes #{$animation-name} {
    @content;
  }
  @-moz-keyframes #{$animation-name} {
    @content;
  }
  @-ms-keyframes #{$animation-name} {
    @content;
  }
  @-o-keyframes #{$animation-name} {
    @content;
  }
  @keyframes #{$animation-name} {
    @content;
  }
}

@mixin animation ($delay, $duration, $animation, $direction: forwards, $fillmode: forwards) {
  -webkit-animation-delay: $delay;
  -webkit-animation-duration: $duration;
  -webkit-animation-name: $animation;
  -webkit-animation-fill-mode: $fillmode;
  -webkit-animation-direction: $direction;
  -moz-animation-delay: $delay;
  -moz-animation-duration: $duration;
  -moz-animation-name: $animation;
  -moz-animation-fill-mode: $fillmode;
  -moz-animation-direction: $direction;
  animation-delay: $delay;
  animation-duration: $duration;
  animation-name: $animation;
  animation-fill-mode: $fillmode;
  animation-direction: $direction;
}

@mixin opacity($opacity) {
  opacity: $opacity;
  $opacity-ie: $opacity * 100;
  filter: alpha(opacity=$opacity-ie); //IE8
}

@mixin size($width, $height: $width) {
  width: $width;
  height: $height;
}

@mixin transition($args...) {
  -webkit-transition: $args;
  -moz-transition: $args;
  -ms-transition: $args;
  -o-transition: $args;
  transition: $args;
}

@mixin transition-delay($delay) {
  -webkit-transition-delay: $delay;
  -moz-transition-delay: $delay;
  -ms-transition-delay: $delay;
  -o-transition-delay: $delay;
  transition-delay: $delay;
}

// generic transform
@mixin transform($transforms) {
  -moz-transform: $transforms;
  -o-transform: $transforms;
  -ms-transform: $transforms;
  -webkit-transform: $transforms;
  transform: $transforms;
}

//transform origin
@mixin transform-origin ($origin) {
  moz-transform-origin: $origin;
  -o-transform-origin: $origin;
  -ms-transform-origin: $origin;
  -webkit-transform-origin: $origin;
  transform-origin: $origin;
}

/* Typical elements */
* {
  box-sizing: border-box;
}

/* Classes by name A-Z */
.branch {
  @include flex-container(flex, column, nowrap, flex-start, center, stretch);
  @include absolute($top: 50%, $left: 50%);
  @include size(10px, 10px);
  transform: translate(-50%, -50%) rotate(0deg);
  @include transform-origin(center bottom);
  @include transition(all .5s);
  .node{
    @include transition(height .5s, width .5s);
    @include transition-delay(.2s);
  }
  &.open {
    @include absolute($top: -100px, $left: calc(25% - 25px));
    @include size(50px, 100px);
    &:nth-child(1) {
      @include transform(rotate(-90deg));
    }
    &:nth-child(2) {
      @include transform(rotate(90deg));
    }
    &:nth-child(3) {
      @include transform(rotate(-45deg));
    }
    &:nth-child(4) {
      @include transform(rotate(45deg));
    }
    &:nth-child(5) {
      @include transform(rotate(0deg));
    }
    .node {
      @include transition-delay(0s);
      height: 50px;
      width: 50px;
      &:hover{
        border-width: 6px;
      }
      &:active{
        @include transform(scale(1.03));
      }
    }
  }
  &.no-animation {
    animation: none;
  }
}

.node {
  @include flex-item(auto, auto, 0, 0);
  @include size(10px);
  background-color: $background-grey;
  border-radius: 50%;
  border: solid 5px;
  &#facebook {
    border-color: $facebook;
  }
  &#google-plus{
    border-color: $google-plus;
  }
  &#twitter{
    border-color: $twitter;
  }
  &#pinterest {
    border-color: $pinterest;
  }
  &#linkedin{
    border-color: $linkedin;
  }
}

.container {
  @include flex-container(flex, column, nowrap, flex-end, center, stretch);
  @include absolute($top: 50%, $left: 50%);
  @include size(210px, 110px);
  @include transform(translate3d(-50%, -100%, 0) rotate(0deg));
  overflow: hidden;
  &.no-animation {
    animation: none;
  }
  &.open {
    .segment{
      cursor: pointer;
      &:nth-child(1) {
        @include transform(rotate(0deg) scale(1) translate3d(0,0,0));
      }
      &:nth-child(2) {
        @include transform(rotate(45deg) scale(1) translate3d(0,0,0));
      }
      &:nth-child(3) {
        @include transform(rotate(90deg) scale(1) translate3d(0,0,0));
      }
      &:nth-child(4) {
        @include transform(rotate(135deg) scale(1) translate3d(0,0,0));
      }
    }
  }
}

.mdi {
  @include relative($top: 50%, $left: 50%);
  @include transform(translate3d(-50%, -50%, 0) rotate(0deg));
  // Share-alt Icons
  &.mdi-facebook{
    @include transform(translate3d(-50%, -50%, 0) rotate(90deg));
  }
  &.mdi-google-plus{
    @include transform(translate3d(-50%, -50%, 0) rotate(45deg));
  }
  &.mdi-pinterest{
    @include transform(translate3d(-50%, -50%, 0) rotate(-45deg));
  }
  &.mdi-linkedin{
    @include transform(translate3d(-50%, -50%, 0) rotate(-90deg));
  }

  // Social Icons
  &.mdi-phone {
    @include transform( rotate(0deg));
  }
  &.mdi-whatsapp {
    @include transform( rotate(-45deg));
  }
  &.mdi-send-circle{
    @include transform( rotate(-90deg));
  }
  &.mdi-gmail{
    @include transform( rotate(-135deg));
  }
}

.segment {
  display: flex;
  align-items: flex-end;
  @include absolute($top: calc(100% - 100px), $left: calc(50% - 100px));
  @include transform(rotate(0deg) scale(0.1) translate3d(0,0,0));
  @include transform-origin(50% 100%);
  @include transition(transform .5s, color .2s);
  @include opacity(1);
  @include size(200px, 100px);
  border-radius: 100px 100px 0px 10px;
  color: #000;
  overflow: hidden;
  &:nth-child(1) {
    background: $snapchat;
  }
  &:nth-child(2){
    background: $vine;
  }
  &:nth-child(3){
    background: $instagram;
  }
  &:nth-child(4){
    background: $whatsapp;
  }
  &:hover {
    color: #333;
  }
  &:active{
    color: #666;
  }
}

.button-share, .button-messenger {
  position: relative;
}
.button-messenger {
  margin-left: 200px;
}

.main-button {
  position: relative;
  z-index: 1;
  @include transition(all .5s);
  @include size(75px, 75px);
  background-color: orange;
  border-radius: 50%;
  color: white;
  font-size: 35px;
  cursor: pointer;
}

.button-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
}

.share-icon {
  color: #FFF;
  font-size: 25px;
}

.share-alt-icon {
  font-size: 25px;
  color: #FFF;
}

.social {
  @include absolute($top: 50%, $left: 50%);
  transform: translateX(-50%) translateY(-50%);
}

.social-icon {
  font-size: 35px;
  position: static;
  margin: 15px 0 4px 15px;
}
</style>
