<script setup lang="ts">
onErrorCaptured((err, instance, info) => {
  document.body.innerHTML = `
    <pre style="color:red;padding:20px;font-size:14px;white-space:pre-wrap;">
      Error: ${err.message}
      Info: ${info}
      Stack: ${err.stack}
    </pre>
  `
  return false
})
import type { ConfigProviderTheme } from 'vant'
import useKeepalive from '~/composables/keepalive'
import { appName,appDescription,appKeywords } from '~/constants'


const colorMode = useColorMode()

const mode = computed(() => {
  return colorMode.value as ConfigProviderTheme
})

const keepAliveRouteNames = computed(() => {
  return useKeepalive().routeCaches as string[]
})
</script>

<template>
  <VanConfigProvider :theme="mode">
    <NuxtLoadingIndicator color="repeating-linear-gradient(to right,var(--c-primary) 0%,var(--c-primary-active) 100%)" />
    <NuxtLayout>
      <NuxtPage :keepalive="{ include: keepAliveRouteNames }" />
    </NuxtLayout>
  </VanConfigProvider>
</template>
