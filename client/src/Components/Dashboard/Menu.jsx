import React, { useContext } from 'react'
import { ChatContext } from '../../Context/ChatContext';
import UserChat from '../Chat/UserChat';
import { AuthContext } from "../../Context/AuthContext"
import PotentialChats from '../Chat/PotentialChats';
import ChatBox from '../Chat/ChatBox';

const Menu = () => {
    const { user } = useContext(AuthContext)
    const { userChats, isUserChatsLoading, updateCurrentChat } = useContext(ChatContext)
    console.log("userChats : ", userChats);
    return (
        <>
            {userChats?.length < 1 ? null : (
                <div className="Menu">
                    <div className="left_menu">
                        <input type="text" name="" id="" className='search_input' placeholder='Search..' />
                        <PotentialChats />
                        <div className='message_box'>
                            {isUserChatsLoading && <p>Loading Chats...</p>}
                            {
                                userChats?.map((chat, index) => {
                                    return (
                                        <div key={index} className='card' onClick={() => updateCurrentChat(chat)}>
                                            <UserChat chat={chat} user={user} />
                                            <div className="hr">
                                                <hr />
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                    </div>
                    <ChatBox />
                </div>
            )}
        </>
    )
}

export default Menu