import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const syncDataToSessionStorage = (token, userInfo) => {
    if (token) {
        sessionStorage.setItem("token", token);
    }
    if (userInfo) {
        sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
};

const getDataFromSessionStorage = () => {
    const token = sessionStorage.getItem("token");
    const userInfo = sessionStorage.getItem("userInfo");
    return {
        token: token,
        userInfo: userInfo ? JSON.parse(userInfo) : null
    };
};

export const AuthProvider = ({children})=>{
    const [token, setToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [isLoadingInfo, setIsLoadingInfo] = useState(true);

    const onLoginSuccess = (token, userInfo) => {
        setToken(token);
        setUserInfo(userInfo);
        syncDataToSessionStorage(token, userInfo);
    }

useEffect(()=>{
    const { token, userInfo } = getDataFromSessionStorage();
    if (token) {
        setToken(token);
        setUserInfo(userInfo);
    }
    setIsLoadingInfo(false);
}, [])

const onLogout = () => {
    setToken(null);
    setUserInfo(null);
    sessionStorage.clear();
}

    return (
        <AuthContext.Provider value={{token, userInfo, onLoginSuccess, isLoadingInfo, onLogout}}>
        {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;