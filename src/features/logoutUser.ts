import { createSlice } from "@reduxjs/toolkit";

interface AuthType {
    logout: boolean
}

const initialState: AuthType = {
    logout: false,
}

export const logoutUser = createSlice({
    name: 'logoutUser',
    initialState,
    reducers: {
        toggle: (state, action) => {
            state.logout = true
        }
    }
})
