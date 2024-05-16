import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest,getRequest } from "../utils/services";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    // const navigate=useNavigate()
    const [user, setUser] = useState(null);
    const [registerError, setRegisterError] = useState(null)
    const [loginError, setLoginError] = useState(null)
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    })

    console.log("loginInfo :", loginInfo);
    useEffect(() => {
        const user = localStorage.getItem("User");
        setUser(JSON.parse(user))
    }, [])

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, [])

    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info);
    }, [])

    const registerUser = useCallback(async () => {
        setRegisterError(null)
        const response = await postRequest(`${baseUrl}/user/register-user`, JSON.stringify(registerInfo))
        if (response.error) {
            return setRegisterError(response)
        }
        localStorage.setItem("User", JSON.stringify(response.user))
        setUser(response)
    }, [registerInfo])

    const loginUser = useCallback(async () => {
        setLoginError(null)
        console.log(loginInfo);
        const response = await postRequest(`${baseUrl}/user/login-user`, JSON.stringify(loginInfo))
        if (response.error) {
            return setLoginError(response)
        }
        localStorage.setItem("User", JSON.stringify(response.user))
        setUser(response)
    }, [loginInfo])

    const logoutUser = useCallback(() => {
        localStorage.removeItem("User");
        setUser(null);
    }, [])

    return (
        <AuthContext.Provider value={{ user, registerInfo, updateRegisterInfo, registerError, registerUser, logoutUser, loginError, loginInfo, updateLoginInfo , loginUser}}>
            {children}
        </AuthContext.Provider>
    )
}