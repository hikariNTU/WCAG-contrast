import { useFloor } from '@/composable'
import { defineStore } from 'pinia'
import { computed, reactive, Ref, unref } from 'vue'
import {
  fromHEX,
  getContrastRatio,
  SolidRGB,
  toHEX,
  toRelativeLuminance,
} from 'wcag-contrast-util'

type MaybeRef<T> = Ref<T> | T

const legalHex = /^#?[0-9a-fA-F]{6}$/

export const useHexColor = (ctxColor: MaybeRef<string>) => {
  const color = computed(() => {
    const c = unref(ctxColor)
    if (!legalHex.test(c)) {
      return toHEX(fromHEX(c).slice(0, 3) as SolidRGB)
    }
    return c
  })

  return color
}

export const useColor = (color: MaybeRef<string>) => {
  const rgba = computed(() => fromHEX(unref(color)))
  const solidHEX = computed(() => toHEX(unref(rgba)).substring(0, 7))
  const luminance = computed(() => toRelativeLuminance(...unref(rgba)))
  const roundedLuminance = useFloor(luminance)

  return reactive({
    rgba,
    solidHEX,
    luminance,
    roundedLuminance,
  })
}

export type ColorMeta = ReturnType<typeof useColor>

export const useColorStore = defineStore('color', () => {
  const text = reactive({
    content: 'hello world',
    format: 'hex',
    color: '#ddd',
  })
  const background = reactive({
    format: 'hex',
    color: '#565',
  })
  const textMeta = useColor(computed(() => text.color))
  const backgroundMeta = useColor(computed(() => background.color))

  const contrastRatio = computed(() =>
    getContrastRatio(text.color, background.color)
  )
  const roundedContrastRatio = useFloor(contrastRatio)
  return {
    text,
    textMeta,
    background,
    backgroundMeta,
    contrastRatio,
    roundedContrastRatio,
  }
})
