import React, { useContext } from 'react'
import avtar from "../../Images/user.png";
import { PiMicrophoneFill } from "react-icons/pi";
import { IoSendSharp } from "react-icons/io5";
import { HiOutlineFaceSmile } from "react-icons/hi2";
import { AuthContext } from '../../Context/AuthContext';
import { ChatContext } from '../../Context/ChatContext';
import UseFetchRecipientUser from '../../Hooks/UseFetchRecipient';
import moment from "moment"

const ChatBox = () => {

    const { user } = useContext(AuthContext)
    const { currentChat, messages, isMessagesLoading } = useContext(ChatContext)
    const { recipientUser } = UseFetchRecipientUser(currentChat, user)
    console.log(recipientUser);
    console.log("messages : ", messages);
    // if (!recipientUser) {
    //     return (
    //         <p>No conversation selected yet...</p>
    //     )
    // }
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
                    {/* <h3>{recipientUser?.name}</h3> */}
                    <h3>vishala gajera</h3>
                </div>
                <div className="main_content">
                    {
                        messages && messages.map((message, index) => {
                            return (
                                <div key={index}>
                                    <div className={`${message?.senderId ===user?._id ? "incoming" : "outgoing"}`}>
                                        <p>{message.text}</p> 
                                        <span>{moment(message.createdAt).calendar()}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {/* <div className="outgoing">
                        <p>Hello</p>
                    </div> */}
                </div>
                <div className="message">
                    <HiOutlineFaceSmile className='Icon' />
                    <input type="text" name="" id="" className='message_input' placeholder='Search..' />
                    <PiMicrophoneFill className='Icon' />
                    <IoSendSharp className='Icon' />
                </div>
            </div>
        </>
    )
}

export default ChatBox