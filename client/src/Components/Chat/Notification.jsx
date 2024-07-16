import React, { useContext, useState } from 'react'
import { IoChatboxSharp } from "react-icons/io5";
import { ChatContext } from '../../Context/ChatContext';
import { AuthContext } from '../../Context/AuthContext';
import { unreadNotificationsFunc } from '../../utils/unreadNotifications';
import moment from 'moment';

const Notification = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useContext(AuthContext);
    const { notifications, userChats, allUsers, markAllNotificationsAsRead, markNotificationAsRead } = useContext(ChatContext);
    const unreadNotifications = unreadNotificationsFunc(notifications);
    const modifiedNotifications = notifications && notifications?.map((n) => {
        const sender = allUsers.find(user => user._id === n.senderId);
        return {
            ...n,
            senderName: sender?.name,
        }
    });

    console.log('un', unreadNotifications);
    console.log("mn", modifiedNotifications);

    return (
        <div className='notifications'>
            <div className="notifications-icon" onClick={() => setIsOpen(true)}>
                <IoChatboxSharp />
                {unreadNotifications?.length === 0 ? null : (
                    <span className='notification-count'>
                        <span>{unreadNotifications?.length}</span>
                    </span>
                )}
            </div>
            {isOpen ?
                <div className="notifications-box">
                    <div className="notifications-header">
                        <h3>Notifications</h3>
                        <div className='mark-as-read' onClick={() => markAllNotificationsAsRead(notifications)}>
                            Mark all as read
                        </div>
                    </div>
                    {modifiedNotifications?.length === 0 ? <span className='notification'>No Notification yet...</span> : null}
                    {modifiedNotifications && modifiedNotifications.map((n, index) => {
                        return <div key={index} className={n.isRead ? "notification" : "notification not-read"} onClick={() => { markNotificationAsRead(n, userChats, user, notifications) }}>
                            <span>{`${n.senderName} sent you a new message`}</span>
                            <span className='notification-time'>{moment(n.date).calendar()}</span>
                        </div>
                    })}
                </div>
                : null}
        </div>
    )
}

export default Notification