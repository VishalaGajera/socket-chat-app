import React, { useContext } from 'react';
import { ChatContext } from '../../Context/ChatContext';
import { AuthContext } from '../../Context/AuthContext';

const PotentialChats = () => {
    const { user } = useContext(AuthContext);
    const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);


    return (
        <div className="all_users">
            {potentialChats && potentialChats.map((u) => (
                <div className="single_user" key={u._id} onClick={() => createChat(user._id, u._id)}>
                    {u.name}
                    <span className={onlineUsers?.some((user) => user?.userId === u?._id) ? "online_dot" : ""}></span>
                </div>
            ))}
        </div>
    );
};

export default PotentialChats;
