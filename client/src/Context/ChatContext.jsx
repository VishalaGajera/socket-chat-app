import { createContext, useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { baseUrl, getRequest, postRequest } from "../utils/services";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const [potentialChats, setPotentialChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState(null);
    const [isMessagesLoading, setIsMessagesLoading] = useState(false);
    const [messagesError, setMessagesError] = useState(null);
    const [sendTextMessageError, setSendTextMessageError] = useState(null);
    const [newMessage, setNewMessage] = useState(null);
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [notifcations, setNotifications] = useState([])
    const [allUser, setAllUser] = useState([]);

    useEffect(() => {
        const newSocket = io("http://localhost:3000");
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [user]);

    //add online user
    useEffect(() => {
        if (!socket) return;

        socket.emit("addNewUser", user?._id);
        socket.on("getOnlineUsers", (res) => {
            setOnlineUsers(res);
        });

        return () => {
            socket.off("getOnlineUsers");
        };
    }, [socket, user]);

    //send message
    useEffect(() => {
        if (!socket) return;

        const recipientId = currentChat?.members?.find((id) => id !== user?._id);
        socket.emit("sendMessage", { ...newMessage, recipientId });

    }, [newMessage]);

    //receive message and notification
    useEffect(() => {
        if (!socket) return;

        socket.on('getMessage', res => {
            if (currentChat?._id !== res.chatId) return;
            setMessages((prev) => [...prev, res]);

        });

        socket.on("getNotification", (res) => {
            const isChatOpen = currentChat?.members.some(id => id === res.senderId);

            if (isChatOpen) {
                setNotifications(prev => [{ ...res, isRead: true }, ...prev])
            } else {
                setNotifications((prev) => [res, ...prev])
            }
        })

        return () => {
            socket.off("getMessage");
            socket.off("getNotification");
        }
    }, [socket, currentChat]);

    useEffect(() => {
        const getUsers = async () => {
            const response = await getRequest(`${baseUrl}/user/getAll-user`);
            if (response.error) {
                return console.log("Error Fetching Users: ", response);
            }
            const pChats = response.filter((u) => {
                if (user?._id === u._id) return false;
                const isChatCreated = userChats?.some((chat) => chat.members.includes(u._id));
                return !isChatCreated;
            });
            setPotentialChats(pChats);
            setAllUser(response)
        };
        getUsers();
    }, [userChats, user]);

    useEffect(() => {
        const getUserChats = async () => {
            if (user?._id) {
                setIsUserChatsLoading(true);
                setUserChatsError(null);
                const response = await getRequest(`${baseUrl}/chat/getUser-chat/${user._id}`);
                setIsUserChatsLoading(false);
                if (response.error) {
                    return setUserChatsError(response);
                }
                setUserChats(response);
            }
        };
        getUserChats();
    }, [user]);

    useEffect(() => {
        const getMessages = async () => {
            if (!currentChat) return;
            setIsMessagesLoading(true);
            setMessagesError(null);
            const response = await getRequest(`${baseUrl}/message/get-message/${currentChat._id}`);
            setIsMessagesLoading(false);
            if (response.error) {
                return setMessagesError(response);
            }
            setMessages(response);
        };
        getMessages();
    }, [currentChat]);

    const sendTextMessage = useCallback(async (textMessage, sender, currentChatId, setTextMessage) => {
        if (!textMessage) return console.log("You must type something...");
        const response = await postRequest(`${baseUrl}/message/create-message`, JSON.stringify({
            chatId: currentChatId,
            senderId: sender._id,
            text: textMessage
        }));
        if (response.error) {
            return setSendTextMessageError(response);
        }
        setNewMessage(response);
        setMessages((prev) => [...prev, response]);
        setTextMessage("");
    }, []);

    const updateCurrentChat = useCallback((chat) => {
        setCurrentChat(chat);
    }, []);

    const createChat = useCallback(async (firstId, secondId) => {
        console.log(firstId, secondId);
        const response = await postRequest(`${baseUrl}/chat/create-chat`, JSON.stringify({ firstId, secondId }));
        if (response.error) {
            return console.log("Error creating chat: ", response);
        }
        setUserChats((prev) => [...prev, response]);
    }, []);

    const markAllNotificationsAsRead = useCallback((notifications) => {
        const mNotifications = notifications.map(n => { return { ...n, isRead: true } });
        setNotifications(mNotifications);
    }, []);
    
    const markNotificationAsRead=useCallback((n,userChats,user, notification)=>{
        //find chat to open
        const desiredChat=userChats.find(chat=> {
            const chatMembers=[user._id, n.senderId]
            const isDesiredChat=chat?.members.every(member=>{
                return chatMembers.includes(member);
            });
            
            return isDesiredChat;
        });
        
        //mark notification as read
        const mNotifications=notifcations.map(el=>{
            if(n.senderId===el.senderId){
                return {...n, isRead:true}
            }else{
                return el;
            }
        })
        updateCurrentChat(desiredChat);
        setNotifications(mNotifications)
    },[])

    return (
        <ChatContext.Provider value={{
            userChats,
            isUserChatsLoading,
            userChatsError,
            potentialChats,
            createChat,
            updateCurrentChat,
            messages,
            isMessagesLoading,
            messagesError,
            currentChat,
            sendTextMessage,
            onlineUsers,
            notifcations,
            allUser,
            markAllNotificationsAsRead,
            markNotificationAsRead
        }}>
            {children}
        </ChatContext.Provider>
    );
};
