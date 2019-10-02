import createRematchPersist from '@rematch/persist'

export const persistPlugin = createRematchPersist({
  whitelist: ['defaultCity'],
  throttle: 500,
  version: 1,
})

