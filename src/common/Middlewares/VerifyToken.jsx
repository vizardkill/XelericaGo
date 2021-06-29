import React, { useEffect, useContext, useCallback, useState } from "react";

//Context
import { AuthContext } from "./Auth";

//Librerias
import axios from "axios";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";

//Componentes de Material UI
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Grid,
    Button,
    Box,
    useTheme,
    useMediaQuery,
} from "@material-ui/core";

//Estilos de Material UI
import { makeStyles } from "@material-ui/core/styles";

//Componentes de Lottie Player
import Player from "react-lottie-player";

const verifyTokenStyles = makeStyles((theme) => ({
    player: {
        position: "relative",
        height: "200px",
        width: "230px",

        [theme.breakpoints.down("sm")]: {
            height: "200px",
            width: "230px",
            marginBottom: "35px",
        },
    },
}));

const VerifyToken = () => {
    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { token, cerrarSesion } = useContext(AuthContext);

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const location = useLocation();

    //===============================================================================================================================================
    //========================================== Declaración de estados =============================================================================
    //===============================================================================================================================================
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [keyLocation, setKeyLocation] = useState();

    const [error, setError] = useState({
        flag: false,
        msg: undefined,
    });

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const classes = verifyTokenStyles();

    const getDataToken = useCallback(async (signalGetDataToken, token) => {
        await axios({
            method: "GET",
            baseURL: `${process.env.REACT_APP_API_BACK_PROT_DATALAKE}://${process.env.REACT_APP_API_BACK_HOST_DATALAKE}${process.env.REACT_APP_API_BACK_PORT_DATALAKE}`,
            url: `${process.env.REACT_APP_API_DATALAKE_LOGIN_GETDATA}`,
            headers: {
                token,
            },
            cancelToken: signalGetDataToken.token,
        })
            .then((res) => {
                if (res.data.error) {
                    throw new Error(res.data.msg);
                }
            })
            .catch((error) => {
                if (!axios.isCancel(error)) {
                    if (error.response) {
                        if (error.response.status === 401) {
                            setModalIsOpen(true);
                            return;
                        }
                    }

                    console.error(error);

                    setError({
                        flag: true,
                        msg: error.message,
                    });
                }
            });
    }, []);

    //===============================================================================================================================================
    //========================================== UseEffects =========================================================================================
    //===============================================================================================================================================
    useEffect(() => {
        setKeyLocation(location.key);
    }, [location.key]);

    useEffect(() => {
        let signalGetDataToken = axios.CancelToken.source();
        let timeInterval;

        if (token) {
            getDataToken(signalGetDataToken, token);
        } else {
            setModalIsOpen(true);
        }

        return () => {
            signalGetDataToken.cancel("Petición abortada.");
            clearInterval(timeInterval);
        };
    }, [getDataToken, token, keyLocation]);

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    if (error.flag) {
        return (
            <Dialog
                open
                fullScreen={fullScreen}
                disableBackdropClick
                disableEscapeKeyDown
            >
                <DialogTitle>Error</DialogTitle>

                <DialogContent>
                    <Grid container spacing={2} direction="row">
                        <Grid item xs={12}>
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="flex-end"
                            >
                                <Box className={classes.player}>
                                    <Player
                                        play
                                        loop
                                        animationData={require("../static/json/animationNotFound.json")}
                                    />
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={12}>
                            <DialogContentText>
                                Ha ocurrido un error al obtener la información del token,
                                si el error persiste por favor comunícate con el área de
                                TI para más información.
                            </DialogContentText>
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button color="primary" onClick={() => cerrarSesion()}>
                        volver a ingresar
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    return (
        <Dialog
            open={(() => {
                if (!Cookies.get("token")) {
                    return true;
                }

                return modalIsOpen;
            })()}
            fullScreen={fullScreen}
            disableBackdropClick
            disableEscapeKeyDown
        >
            <DialogTitle>Sesión expirada</DialogTitle>

            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center" alignItems="flex-end">
                            <Box className={classes.player}>
                                <Player
                                    play
                                    loop
                                    animationData={require("../static/json/animationExpireSesion.json")}
                                />
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <DialogContentText>
                            Tu sesion ha expirado, por favor ingresa nuevamente para
                            continuar.
                        </DialogContentText>
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>
                <Button color="primary" onClick={() => cerrarSesion()}>
                    volver a ingresar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default VerifyToken;
