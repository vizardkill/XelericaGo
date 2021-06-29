import React, { useState, useRef, useContext, Fragment } from "react";

//Context
import { AuthContext } from "./Auth";

//Librerias
import IdleTimer from "react-idle-timer";

//Componentes de Material UI
import {
    Dialog,
    DialogActions,
    Typography,
    DialogTitle,
    DialogContent,
    Button,
    DialogContentText,
    useTheme,
    useMediaQuery,
} from "@material-ui/core";

const IdleTimerContainer = () => {
    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { cerrarSesion } = useContext(AuthContext);

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    //===============================================================================================================================================
    //========================================== Declaración de estados =============================================================================
    //===============================================================================================================================================
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    //===============================================================================================================================================
    //========================================== Declaración de referencias =========================================================================
    //===============================================================================================================================================
    const idleTimerRef = useRef(null);
    const sessionTimeoutRef = useRef(null);

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const onIdle = () => {
        setModalIsOpen(true);
        sessionTimeoutRef.current = setTimeout(logOut, 1000 * 60);
    };

    const logOut = () => {
        cerrarSesion();
    };

    const stayActive = () => {
        setModalIsOpen(false);
        clearTimeout(sessionTimeoutRef.current);
    };

    const redirectLogin = () => {
        setIsLoggedIn(false);
        logOut();
    };

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    return (
        <Fragment>
            {!isLoggedIn && redirectLogin()}
            <IdleTimer ref={idleTimerRef} timeout={1000 * 60 * 60} onIdle={onIdle} />

            <Dialog open={modalIsOpen} fullScreen={fullScreen}>
                <DialogTitle>Aviso de inactividad</DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Has estado inactivo durante 1 hora, ¿deseas permanecer en
                        sesión?
                    </DialogContentText>
                    <Typography variant="caption">
                        <b>NOTA:</b>La sesión se cerrara automáticamente en 1 minuto.
                    </Typography>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => logOut()}>Salir</Button>

                    <Button color="primary" onClick={() => stayActive()}>
                        Permanecer
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
};

export default IdleTimerContainer;
