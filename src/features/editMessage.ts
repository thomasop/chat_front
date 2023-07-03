import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    otherIdUser: '',
}
export const editMessage = createSlice({
    name: 'editMessage',
    initialState,
    reducers: {
        edit: (state, action) => {
            state.otherIdUser = action.payload.otherIdUser;
        }
    }
})