import VConsole from 'vconsole'

export default defineNuxtPlugin(() => {
  const vConsole = new VConsole()
  return { provide: { vConsole } }
})
