<script setup lang="ts">
import { useRouteCacheStore } from '@/stores'

const routeCacheStore = useRouteCacheStore()

const keepAliveRouteNames = computed(() => {
  return routeCacheStore.routeCaches
})



// const mode = computed(() => {
//   return isDark.value ? 'dark' : 'light'
// })
</script>

<template>
  <!-- <van-config-provider :theme="mode"> -->
    <router-view v-slot="{ Component }">
      <section class="overflow-hidden">
        <keep-alive :include="keepAliveRouteNames">
          <component :is="Component" />
        </keep-alive>
      </section>
    </router-view>
  <!-- </van-config-provider> -->
</template>

<style scoped>
/* 全局禁用长按保存 */
* {
  /* 禁用所有用户交互 */
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -webkit-user-drag: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-manipulation: none;
  -webkit-text-size-adjust: none;
  
  /* 标准属性 */
  user-select: none;
  user-drag: none;
  text-size-adjust: none;
}
</style>
