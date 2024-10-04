import { configureStore } from '@reduxjs/toolkit'
import { weatherApi } from './weather/weather.api'
import { setupListeners } from '@reduxjs/toolkit/query'
import { weatherReducer } from './weather/weather.slice'

export const store = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
    weather: weatherReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
