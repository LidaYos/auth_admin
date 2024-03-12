/**
 * 这里是监控屏幕大小，以做适配
 */
import { ref, watch } from "vue"
import useWindowResize from '@/hooks/useWindowResize.ts'

function useAutoWidth(initData: any) {
    const autoWidth = ref(initData.width)
  
    const { width } = useWindowResize({
      isDebounce: true,
      debounceTime: 400,
      width: document.body.clientWidth,
    })
    watch(
      width,
      () => {
        if (width.value < initData.fullWidth) {
          autoWidth.value = '100%'
        } else {
          autoWidth.value = initData.width
        }
      },
      { immediate: true }
    )
  
    return { autoWidth }
  }
  
  export default useAutoWidth