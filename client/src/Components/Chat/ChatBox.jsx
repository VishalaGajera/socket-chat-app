import React, { useContext, useEffect, useRef, useState } from 'react'
import avtar from "../../Images/user.png";
import { PiMicrophoneFill } from "react-icons/pi";
import { IoSendSharp } from "react-icons/io5";
import { HiOutlineFaceSmile } from "react-icons/hi2";
import { AuthContext } from '../../Context/AuthContext';
import { ChatContext } from '../../Context/ChatContext';
import UseFetchRecipientUser from '../../Hooks/UseFetchRecipient';
import moment from "moment"
import InputEmoji from "react-input-emoji"

const ChatBox = () => {

    const { user } = useContext(AuthContext)
    const { currentChat, messages, isMessagesLoading, sendTextMessage } = useContext(ChatContext)
    const { recipientUser } = UseFetchRecipientUser(currentChat, user)
    const [textMessage, setTextMessage] = useState("");
    const scroll=useRef();
    
    useEffect(()=>{
        scroll.current?.scrollIntoView({behavior:"smooth"})
    },[messages])
    if (!user) {
        return (
            <p className='p'>Loading user...</p>
        )
    }
    
    if (!recipientUser) {
        return (
            <p className='p'>No conversation selected yet...</p>
        )
    }
    if (isMessagesLoading) {
        return (
            <p>Locading Chat ...</p>
        )
    }

    return (
        <>
            <div className="right_chat">
                <div className="chat_header">
                    <img src={avtar} alt="" height={"50px"} width={"50px"} className='img' />
                    <h3>{recipientUser?.name}</h3>
                    {/* <h3>vishala gajera</h3> */}
                </div>
                <div className="main_content">
                    {
                        messages && messages.map((message, index) => {
                            return (
                                    <div className={`${message?.senderId === user?._id ? "incoming" : "outgoing"}`} ref={scroll} key={index}>
                                        <p>{message.text}</p>
                                        {/* <span>{moment(message.createdAt).format('h:mm A')}</span> */}
                                    </div>
                            )
                        })
                    }
                    {/* <div className="outgoing">
                        <p>Hello</p>
                    </div> */}
                </div>
                <div className="message">
                    <InputEmoji value={textMessage} onChange={setTextMessage} />
                    <IoSendSharp className='Icon' onClick={() => sendTextMessage(textMessage, user, currentChat._id, setTextMessage)} />
                </div>
            </div>
        </>
    )
}

export default ChatBox