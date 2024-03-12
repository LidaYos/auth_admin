import { ref, onMounted, onBeforeUnmount } from 'vue'
import { debounce } from '@/utils/index.ts'

function useWindowResize(params: any) {
  const initParams = { isDebounce: false, debounceTime: 500, width: 0, height: 0 }
  const config = Object.assign(initParams, params)
  const width = ref(config.width)
  const height = ref(config.height)

  let resizeDebounce: any = null
  if (config.isDebounce) {
    resizeDebounce = debounce(
      (event: any) => {
        if (event && event.target) {
          width.value = event.target.innerWidth
          height.value = event.target.innerHeight
        }
      },
      config.debounceTime,
      false
    )
  }

  const windowSizeChange = (event: any) => {
    if (event && event.target) {
      if (config.isDebounce) {
        resizeDebounce(event)
      } else {
        width.value = event.target.innerWidth
        height.value = event.target.innerHeight
      }
    }
  }

  onMounted(() => {
    window.addEventListener('resize', windowSizeChange)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', windowSizeChange)
    resizeDebounce = null
  })

  return { width, height }
}

export default useWindowResize
