import { ref } from "vue"

export const register = (initList) => {
    const auto = ref(initList)
    return auto
}