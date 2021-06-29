import React, { useState, useContext, useCallback, useEffect, useRef } from "react";

//Context
import { AuthContext } from "./Auth";

//librerias
import { Redirect, Route } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

//Componentes
import Loader from "../Loader";
import PageError from "../Error";

const PrivateRoute = ({ children, ...props }) => {
    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { token, handlerChangeData } = useContext(AuthContext);

    //===============================================================================================================================================
    //========================================== Declaración de estados =============================================================================
    //===============================================================================================================================================
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState({
        flag: false,
        msg: undefined,
    });

    //===============================================================================================================================================
    //========================================== Referencias ========================================================================================
    //===============================================================================================================================================
    const handlerChangeDataRef = useRef(handlerChangeData);

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const getDataToken = useCallback(
        async (signalSubmitData) => {
            setLoading(true);

            await axios(
                {
                    method: "GET",
                    baseURL: `${process.env.REACT_APP_API_GLPI_PROT}://${process.env.REACT_APP_API_GLPI_HOST}${process.env.REACT_APP_API_GLPI_PORT}`,
                    url: `${process.env.REACT_APP_API_GLPI_GETSESSION}`,
                    headers: {
                        "Content-Type": "application/json",
                        "App-Token": `${process.env.REACT_APP_API_APPTOKEN}`,
                        "Session-Token": token,
                    },
                },
                {
                    cancelToken: signalSubmitData.token,
                }
            )
                .then((res) => {
                    if (!res.data.session) {
                        throw new Error("El servicio no esta disponible");
                    }

                    setLoading(false);

                    handlerChangeDataRef.current("strData", res.data.session);
                })
                .catch((error) => {
                    if (!axios.isCancel(error)) {
                        if (error.response) {
                            if (error.response.status === 401) {
                                handlerChangeDataRef.current("token", undefined);
                                toast.error("Peticion erronea");
                                return;
                            }
                        }

                        console.error(error);

                        setError({
                            flag: true,
                            msg: error.message,
                        });

                        setLoading(false);
                    }
                });
        },
        [token]
    );

    //===============================================================================================================================================
    //========================================== UseEffects =========================================================================================
    //===============================================================================================================================================
    useEffect(() => {
        let signalGetDataToken = axios.CancelToken.source();

        if (token) {
            getDataToken(signalGetDataToken, token);
        }

        return () => {
            signalGetDataToken.cancel("Petición abortada.");
        };
    }, [token, getDataToken]);

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    if (!token) {
        return <Redirect to="/" />;
    }

    if (error.flag) {
        return (
            <PageError
                severity="error"
                title={error.msg}
                msg="Ha ocurrido un error al obtener la información del token, si el error persiste por favor comunícate con el área de TI para más información."
            />
        );
    }

    if (loading) {
        return <Loader />;
    }

    return <Route {...props}>{children}</Route>;
};

export default PrivateRoute;
