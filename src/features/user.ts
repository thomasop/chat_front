import { createSlice } from "@reduxjs/toolkit";

interface UserState {
    user: Result[] | null
}
  
interface Result {
id: number;
firstname: string;
lastname: string;
mail: string;
password: string;
status: boolean;
}

const initialState: UserState = {
    user: null
}

export const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUser: (state, action) => {
            state.user = action.payload.user;
        }
    }
})