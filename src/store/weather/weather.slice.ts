import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const LOCAL_STORAGE_FAVOURITE_KEY = 'rfk'

interface WeatherState {
  favourites: string[]
}

const initialState: WeatherState = {
  favourites: JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_FAVOURITE_KEY) ?? '[]',
  ),
}

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    addFavourite(state, action: PayloadAction<string>) {
      state.favourites.push(action.payload)
      localStorage.setItem(
        LOCAL_STORAGE_FAVOURITE_KEY,
        JSON.stringify(state.favourites),
      )
    },
    removeFavourite(state, action: PayloadAction<string>) {
      state.favourites = state.favourites.filter((f) => f !== action.payload)
      localStorage.setItem(
        LOCAL_STORAGE_FAVOURITE_KEY,
        JSON.stringify(state.favourites),
      )
    },
  },
})

export const { actions: weatherActions, reducer: weatherReducer } = weatherSlice
