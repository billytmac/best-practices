<script setup lang="ts">
definePageMeta({
  name: "index",
});

const toPc = () => {
  navigateTo('/pc')
}
const toMobile = () => {
  navigateTo('/mobile')
}
const toSpre = () => {
  navigateTo('/spre')
}

</script>
<template>
  <div>
    <h1 @click="toPc" class="cursor-pointer">长页pc端页面</h1>
    <h1 @click="toMobile" class="cursor-pointer">长页mobile端页面</h1>
    <h1 @click="toSpre" class="cursor-pointer">短页spre端页面</h1>
  </div>
</template>