import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: '',
    userId: '',
    userLog: false
}
export const login = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            state.userLog = action.payload.userLog
        }
    }
})

