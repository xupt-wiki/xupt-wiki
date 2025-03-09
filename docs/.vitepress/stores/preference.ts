import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

export const usePreferenceStore = defineStore('preference', () => {
    const font = useLocalStorage('font', null)

    return {
        font,
    }
})
