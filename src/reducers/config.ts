import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ConfigState {
  navbar: { height: number }
  backgroundColour: string
}

const initialState: ConfigState = {
  navbar: { height: 0 },
  backgroundColour: 'bg-white', // Default background color
}

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setNavbarHeight: (state, action: PayloadAction<number>) => {
      state.navbar.height = action.payload
    },
    setBackgroundColour: (state, action: PayloadAction<string>) => {
      state.backgroundColour = action.payload
    },
  },
})

export const { setNavbarHeight, setBackgroundColour } = configSlice.actions
export default configSlice.reducer
