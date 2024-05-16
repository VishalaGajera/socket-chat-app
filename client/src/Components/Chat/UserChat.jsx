import React from 'react'
import UseFetchRecipientUser from '../../Hooks/UseFetchRecipient'
import avtar from "../../Images/user.png";

const UserChat = ({ chat, user }) => {
    const { recipientUser } = UseFetchRecipientUser(chat, user);

    return (
        <div className="users_card">
            <div className="users">
                <div className="image">
                    <div className="online_dot"></div>
                    <img src={avtar} alt="" height={"50px"} width={"50px"} className='img' />
                </div>
                <div className="text_content">
                    <div className="name"><b>{recipientUser?.name}</b></div>
                    <div className='text'>Text Message</div>
                </div>
            </div>
            <div className="date_content">
                <div className="date">
                    5/16/2024
                </div>
                <div className="message_notification">
                    2
                </div>
            </div>
        </div>
    )
}

export default UserChat