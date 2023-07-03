import { createSlice } from "@reduxjs/toolkit";

interface Type {
    width: string | null
}
const initialState: Type = {
    width: null,
}

export const screenWidth = createSlice({
    name: 'screenWidth',
    initialState,
    reducers: {
        editWidth: (state, action) => {
            state.width = action.payload.width;
        }
    }
})