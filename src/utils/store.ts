import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit"
import { login } from "../features/login"
import { modal } from "../features/modal"
import { user } from "../features/user"
import { conversation } from "../features/conversation"
import { newMessage } from "../features/newMessage"
import { logoutUser } from "../features/logoutUser"
import { editMessage } from "../features/editMessage"
import { message } from "../features/message"
import { screenWidth } from "../features/screenWidth"
import { mobileDisplayConversation } from "../features/mobileDisplayConversation"

export const store = configureStore({
    reducer: {
        login: login.reducer,
        modal: modal.reducer,
        user: user.reducer,
        conversation: conversation.reducer,
        newMessage: newMessage.reducer,
        logoutUser: logoutUser.reducer,
        editMessage: editMessage.reducer,
        message: message.reducer,
        screenWidth: screenWidth.reducer,
        mobileDisplayConversation: mobileDisplayConversation.reducer
    },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({
            serializableCheck: false
        }),
    ],
})

export type RootState = ReturnType<typeof store.getState>