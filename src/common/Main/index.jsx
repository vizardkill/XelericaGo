import React, { Fragment, useContext } from "react";

//Context
import { AuthContext } from "../Middlewares/Auth";

//librerias
import { useHistory } from "react-router-dom";

//Componentes de Material UI
import {
    AppBar,
    Toolbar,
    IconButton,
    Container,
    Box,
    Tooltip,
    Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

//Imagenes
import LogoImg from "../../static/img/logoXelerica.png";

//Iconos
import { Home as HomeIcon, Logout as LogoutIcon } from "@material-ui/icons";

const mainStyles = makeStyles((theme) => ({
    appBarColor: {
        backgroundColor: "#031E3A",
    },

    footer: {
        position: "fixed",
        bottom: 0,
        left: 0,
        backgroundColor: "#031E3A",
        width: "100%",
        minHeight: "35px",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
    },
}));

const Main = ({ children }) => {
    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { cerrarSesion } = useContext(AuthContext);

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const { push } = useHistory();
    const classes = mainStyles();

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    return (
        <Fragment>
            <AppBar classes={{ colorPrimary: classes.appBarColor }} >
                <Toolbar  >
                    <Box
                        sx={{
                            display: "flex",
                            flexGrow: 1,
                            alignItems: "center",
                        }}
                    >
                        <img alt="Logo" src={LogoImg} width="180px" height="auto" />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <IconButton color="secondary" onClick={() => push("/")}>
                            <Tooltip title="Inicio">
                                <HomeIcon />
                            </Tooltip>
                        </IconButton>

                        <IconButton color="secondary" onClick={() => cerrarSesion()}>
                            <Tooltip title="Cerrar sesión">
                                <LogoutIcon />
                            </Tooltip>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <main>
                <Container>{children}</Container>
            </main>

            <div className={classes.footer}>
                <Box
                    sx={{
                        width: "inherit",
                        height: "35px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Typography variant="caption">
                        <span style={{ color: "white" }}>
                            Todos los derechos reservados 2021
                        </span>
                    </Typography>
                </Box>
            </div>
        </Fragment>
    );
};

export default Main;
