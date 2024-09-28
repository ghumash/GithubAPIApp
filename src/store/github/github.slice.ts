import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const LOCAL_STORAGE_FAVOURITE_KEY = 'rfk'

interface GithubState {
  favourites: string[]
}

const initialState: GithubState = {
  favourites: JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_FAVOURITE_KEY) ?? '[]',
  ),
}

export const githubSlice = createSlice({
  name: 'github',
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

export const { actions: githubActions, reducer: githubReducer } = githubSlice
