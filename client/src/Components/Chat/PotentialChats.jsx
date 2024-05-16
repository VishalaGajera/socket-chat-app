import React, { useContext } from 'react'
import { ChatContext } from '../../Context/ChatContext'
import { AuthContext } from '../../Context/AuthContext'

const PotentialChats = () => {
    const { user } = useContext(AuthContext)
    const { potentialChats, createChat } = useContext(ChatContext)
    console.log("PotentialChats : ", potentialChats);
    return (
        <>
            <div className="all_users">
                {
                    potentialChats && potentialChats.map((u, index) => {
                        return (
                            <>
                                <div className="single_user" key={index} onClick={() => createChat(user._id, u._id)}>
                                    {u.name}
                                    <div className="online_dot"></div>
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </>
    )
}

export default PotentialChats