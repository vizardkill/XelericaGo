import React, { useState, useEffect, createContext, memo } from "react";

//Librerias
import Cookies from "js-cookie";

//Context
export const AuthContext = createContext();

const Auth = ({ children }) => {
    const [data, setData] = useState({
        token: undefined,
        strData: undefined,
    });

    const handlerChangeData = (type, value) => {
        setData((prevState) => ({
            ...prevState,
            [type]: value,
        }));
    };

    const cerrarSesion = () => {
        setData({
            token: undefined,
            strData: undefined,
        });
        localStorage.removeItem("session_token");
        Cookies.remove("session_token");
    };

    useEffect(() => {
        if (localStorage.getItem("session_token") && !Cookies.get("session_token")) {
            Cookies.set("session_token", localStorage.getItem("session_token"));
        }

        setData((prevState) => ({
            ...prevState,
            token: localStorage.getItem("session_token") || Cookies.get("session_token"),
        }));
    }, []);

    return (
        <AuthContext.Provider
            value={{
                token: data.token,
                strInfoUser: data.strData,
                handlerChangeData,
                cerrarSesion,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default memo(Auth);
