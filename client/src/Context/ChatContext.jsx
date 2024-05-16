import { createContext, useEffect, useState } from "react";

import { baseUrl, getRequest } from "../utils/services";

export const ChatContext = createContext()

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null)
    const [isUserChatsLoading, setIsUserChatsLoading] = useState()
    const [UserChatsError, setUserChatsError] = useState(null)

    useEffect(() => {
        const getUserChats = async () => {
            if (user?._id) {
                setIsUserChatsLoading(true)
                setUserChatsError(null)
                const response = await getRequest(`${baseUrl}/chat/getUser-chat/${user?._id}`)
                setIsUserChatsLoading(false)
                if (response.error) {
                    return setUserChatsError(response)
                }
                setUserChats(response)
            }
        }
        getUserChats()
    }, [user])
    return (
        <ChatContext.Provider value={{
            userChats, isUserChatsLoading, UserChatsError
        }}>
            {children}
        </ChatContext.Provider>
    )
}