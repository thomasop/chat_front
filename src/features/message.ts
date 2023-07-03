import { createSlice } from "@reduxjs/toolkit";

interface UserState {
    messages: Data | null
}

interface Data {
    result: Result[];
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
    messages: null,
}

export const message = createSlice({
    name: 'message',
    initialState,
    reducers: {
        message: (state, action) => {
            state.messages = action.payload.messages;
        }
    }
})