import { createSlice } from "@reduxjs/toolkit";

interface UserState {
    conversation: Result | null
}
  
interface Result {
    id: number;
    last_message_id: number
    message: Message
    userOneAsId: User;
    userOneId: number;
    userTwoAsId: User;
    userTwoId: number;
}

interface Message {
    id: number;
    content: string;
    new: string;
    conversationId: number;
    userId: number;
    user: boolean;
    date: string
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
    conversation: null,
}

export const newConversation = createSlice({
    name: 'newConversation',
    initialState,
    reducers: {
        newConversation: (state, action) => {
            state.conversation = action.payload.conversation;
        }
    }
})