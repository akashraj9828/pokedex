import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ConfigState {
  navbar: { height: number }
}

const initialState: ConfigState = {
  navbar: { height: 0 },
}

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setNavbarHeight: (state, action: PayloadAction<number>) => {
      state.navbar.height = action.payload
    },
  },
})

export const { setNavbarHeight } = configSlice.actions
export default configSlice.reducer
