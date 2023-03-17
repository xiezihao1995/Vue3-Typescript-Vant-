<template>
  <div class="about">
    <h1 v-text="text1"></h1>
    <h2></h2>
  </div>
</template>

<script lang="ts">
import {Options,Vue} from 'vue-class-component';
export default class AboutView extends Vue{
  text1: string="你是谁";
  text2: string="<i>我是谁</i>"
}
</script>
