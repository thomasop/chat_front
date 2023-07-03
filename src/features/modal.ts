import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    display: 'none',
    userNameAdd: '',
    userIdAdd: '',
    opacity: "1"
}

export const modal = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        modalDisplay: (state, action) => {
            state.display = action.payload.display;
            state.userNameAdd = action.payload.userNameAdd;
            state.userIdAdd = action.payload.userIdAdd
            state.opacity = action.payload.opacity
        }
    }
})