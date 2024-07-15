import React, { useContext, useEffect, useState } from 'react'
import "../Signup/Signup.css"
import 'animate.css';
import { Link } from "react-router-dom"
import Lottie from "lottie-react"
import Navbar from '../Common/Navbar'
import { SlEnvolopeLetter } from "react-icons/sl";
import { CiLock } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import animationData from "../../assets/Animation - 1715667767405.json"
import { AuthContext } from '../../Context/AuthContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const { registerInfo, updateRegisterInfo, registerUser, registerError } = useContext(AuthContext)
    useEffect(() => {
        if (registerError) {
            toast.error(registerError.message);
        }
    }, [registerError])
    return (
        <>
            <div className="signup">
                <Navbar />
                <div className="signup_form">
                    <div className="main_content">
                        <div className="right_signup">
                            <Lottie animationData={animationData} loop={true} />
                        </div>
                        <div className="left_signup">
                            <div className="heading animate__animated  animate__flipInY">
                                <h1>Sign Up</h1>
                            </div>
                            <div className="form-control control">
                                <FaUser />
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder='xyz'
                                    className='input'
                                    value={registerInfo.name}
                                    onChange={(e) => updateRegisterInfo({ ...registerInfo, name: e.target.value })} />
                            </div>
                            <div className="form-control control">
                                <SlEnvolopeLetter />
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder='xyz@gmail.com'
                                    className='input'
                                    value={registerInfo.email}
                                    onChange={(e) => updateRegisterInfo({ ...registerInfo, email: e.target.value })} />
                            </div>
                            <div className="form-control control">
                                <CiLock />
                                <input
                                    type="password"
                                    name="pwd"
                                    id="pwd"
                                    placeholder='********'
                                    className='input'
                                    value={registerInfo.password}
                                    onChange={(e) => updateRegisterInfo({ ...registerInfo, password: e.target.value })} />
                            </div>
                            <div className="form-control">
                                <button className='btn'
                                    onClick={registerUser}>Sign Up</button>
                            </div>
                            <div className="form-control ">
                                Have an Account ? <Link to={"/"} className='link'>Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer/>
            </div>
        </>
    )
}

export default Signup