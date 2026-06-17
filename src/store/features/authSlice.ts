import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
    value: number
}

const initialState: AuthState = {
    value: 0
}

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        increment: (state) => { state.value += 1 },
        decrement: (state) => { state.value -= 1 },
    },
})

export const { increment, decrement } = authSlice.actions
export default authSlice.reducer