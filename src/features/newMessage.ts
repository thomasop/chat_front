import { createSlice } from "@reduxjs/toolkit";

interface UserState {
    message: Result | null
}
  
interface Result {
    id: number;
    content: string;
    date: string;
    userId: number;
    conversationId: number;
    new: boolean;
    user: User
}

interface User {
    id: number;
    firstname: string;
    lastname: string;
    mail: string;
    password: string;
    status: boolean;
  }

const initialState: UserState = {
    message: null,
}

export const newMessage = createSlice({
    name: 'newMessage',
    initialState,
    reducers: {
        newMessage: (state, action) => {
            state.message = action.payload.message;
        }
    }
})