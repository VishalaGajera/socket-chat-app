import React, { useContext, useEffect } from 'react'
import "./Login.css"
import 'animate.css';
import { Link } from "react-router-dom"
import Navbar from '../Common/Navbar'
import { FiUser } from "react-icons/fi";
import { CiLock } from "react-icons/ci";
import animationData from "../../assets/Animation - 1715662448996.json"
import Lottie from "lottie-react"
import { AuthContext } from '../../Context/AuthContext';

const Login = () => {

    const { loginUser, loginError, loginInfo, updateLoginInfo } = useContext(AuthContext)
    useEffect(() => {
        if (loginError) {
            alert(loginError.error)
        }
    }, [loginError])
    
    return (
        <>
            <div className="login">
                <Navbar />
                <div className="login_form">
                    <div className="main_content">
                        <div className="left_side ">
                            <div className="heading animate__animated  animate__flipInY">
                                <h1>LOGIN</h1>
                            </div>
                            <div className="form-control control">
                                <FiUser />
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder='xyz@gmail.com'
                                    className='input'
                                    onChange={(e) => updateLoginInfo({ ...loginInfo, email: e.target.value })} />
                            </div>
                            <div className="form-control control">
                                <CiLock />
                                <input
                                    type="password"
                                    name="pwd"
                                    id="pwd"
                                    placeholder='********'
                                    className='input'
                                    onChange={(e) => updateLoginInfo({ ...loginInfo, password: e.target.value })} />
                            </div>
                            <div className="form-control checkbox">
                                <input type="checkbox" name="forgot" id="forgot" className='check' />Forgot Password
                            </div>
                            <div className="form-control">
                                <button className='btn' onClick={loginUser}>Login</button>
                            </div>
                            <div className="form-control ">
                                Don't have an Account ? <Link to={"/signup"} className='link'>Sign Up</Link>
                            </div>
                        </div>
                        <div className="right_side">
                            <Lottie animationData={animationData} loop={true} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login