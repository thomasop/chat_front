import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    display: "block",
}

export const mobileDisplayConversation = createSlice({
    name: 'mobileDisplayConversation',
    initialState,
    reducers: {
        toggle: (state, action) => {
            state.display = action.payload.display;
        }
    }
})