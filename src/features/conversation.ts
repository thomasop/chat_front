import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    displayDivMessage: 'none',
    conversationId: '',
    nameOtherUser: '',
    idOtherUser: '',
}
export const conversation = createSlice({
    name: 'conversation',
    initialState,
    reducers: {
        conversation: (state, action) => {
            state.displayDivMessage = action.payload.displayDivMessage;
            state.conversationId = action.payload.conversationId;
            state.nameOtherUser = action.payload.nameOtherUser;
            state.idOtherUser = action.payload.idOtherUser;
        }
    }
})

