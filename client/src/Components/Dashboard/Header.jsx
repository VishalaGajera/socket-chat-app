import React from 'react'
import { LuRefreshCcw } from "react-icons/lu";
import { RiMessage2Line } from "react-icons/ri";
import { IoMdMenu } from "react-icons/io";
import user from "../../Images/user.png"

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
                        <RiMessage2Line />
                        <IoMdMenu />
                    </div>
                </div>
                <div className="right_header">
                        <img src={user} alt="" height={"50px"} width={"50px"} className='img'/>
                        <h3>Vishala Gajera</h3>
                </div>
            </div>
        </>
    )
}

export default Header