import React, { useContext } from 'react'
import UseFetchRecipientUser from '../../Hooks/UseFetchRecipient'
import avtar from "../../Images/user.png";
import { ChatContext } from '../../Context/ChatContext';
import { unreadNotificationsFunc } from '../../utils/unreadNotifications';

const UserChat = ({ chat, user }) => {
    const { recipientUser } = UseFetchRecipientUser(chat, user);
    const { onlineUsers } = useContext(ChatContext);

    const unreadNotifications = unreadNotificationsFunc(notifications);
    const thisUserNotifications = unreadNotifications?.filter(
        n => n.senderId === recipientUser?._id
    )
    const isOnline = onlineUsers?.some((user) => user?.userId === recipientUser?._id)

    return (
        <div className="users_card">
            <div className="users">
                <div className="image">
                    <div className={onlineUsers?.some((user) => user?.userId == recipientUser?._id) ? "online_dot" : ""}></div>
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
                <div className={thisUserNotifications.length > 0 ? "message_notification" : ""}>
                    {thisUserNotifications?.length > 0 ? thisUserNotifications?.length : ""}

                </div>
                <span className={isOnline ? "online_dot" : ""}></span>
            </div>
        </div>
    )
}

export default UserChat