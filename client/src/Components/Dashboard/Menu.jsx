import React, { useContext } from 'react'
import user from "../../Images/user.png";
import { PiMicrophoneFill } from "react-icons/pi";
import { IoSendSharp } from "react-icons/io5";
import { HiOutlineFaceSmile } from "react-icons/hi2";
import { ChatContext } from '../../Context/ChatContext';

const Menu = () => {
const {userChats,isUserChatsLoading,UserChatsError}=useContext(ChatContext)
console.log("userChats : ", userChats);
    return (
        <>
            <div className="Menu">
                <div className="left_menu">
                    <input type="text" name="" id="" className='search_input' placeholder='Search..' />
                    <div className="users">
                        <img src={user} alt="" height={"50px"} width={"50px"} className='img' />
                        <h3>Vishala Gajera</h3>
                    </div>
                    <div className="hr">
                        <hr />
                    </div>
                </div>
                <div className="right_chat">
                    <div className="main_content">
                        <div className="incoming">
                            <p>Hiii</p>
                        </div>
                        <div className="outgoing">
                            <p>Hello</p>
                        </div>
                    </div>
                    <div className="message">
                        <HiOutlineFaceSmile className='Icon' />
                        <input type="text" name="" id="" className='message_input' placeholder='Search..' />
                        <PiMicrophoneFill className='Icon' />
                        <IoSendSharp className='Icon' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Menu