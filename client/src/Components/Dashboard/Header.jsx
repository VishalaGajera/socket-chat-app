import React from 'react'
import { LuRefreshCcw } from "react-icons/lu";
import { RiMessage2Line } from "react-icons/ri";
import { IoMdMenu } from "react-icons/io";
import user from "../../Images/user.png"
import Notification from '../Chat/Notification';

const Header = () => {
    return (
        <>
            <div className="header">
                <div className="left_header">
                    <div className="profile_pic">
                        Chat Room
                    </div>
                    <div className="icon">
                        <LuRefreshCcw />
                        {/* <RiMessage2Line /> */}
                        <Notification/>
                        <IoMdMenu />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header