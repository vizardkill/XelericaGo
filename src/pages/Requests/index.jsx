import React, { Fragment, useState, useContext } from "react";

//Librerias
import {} from "react-timer-hook"

//Context
import { AuthContext } from "../../common/Middlewares/Auth";

//Componentes Material UI
import { IconButton, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

//Iconos
import { Campaign as CampaignIcon } from "@material-ui/icons";

//Componentes
import ModalSetRequest from "./modalSetRequest";

const requestHomeStyles = makeStyles((theme) => ({
    rootIconButton: {
        backgroundColor: "#031E3A",
        border: "20px solid #9a0036",
        width: "250px",
        height: "250px",
        [theme.breakpoints.down("sm")]: {
            width: "180px",
            height: "180px",
        },
    },

    icon: {
        width: "100px",
        height: "100px",
        [theme.breakpoints.down("sm")]: {
            width: "70px",
            height: "70px",
        },
    },
}));

const RequestHome = () => {
    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { strInfoUser } = useContext(AuthContext);

    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [openModalSetRequest, setOpenModalSetRequest] = useState(false);

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const classes = requestHomeStyles();

    const handlerOpenModalSetRequest = () => {
        setOpenModalSetRequest(!openModalSetRequest);
    };

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    return (
        <Fragment>
            <ModalSetRequest
                open={openModalSetRequest}
                handleClose={handlerOpenModalSetRequest}
            />

            <Box
                sx={{
                    width: "inherit",
                    height: "90vh",
                    display: "Flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        marginBottom: "50px",
                        marginTop: "35px"
                    }}
                >
                    <Typography variant="h5">{`¡Bienvenido ${strInfoUser?.glpifirstname}!`}</Typography>
                </Box>

                <IconButton
                    classes={{ root: classes.rootIconButton }}
                    color="secondary"
                    onClick={() => handlerOpenModalSetRequest()}
                >
                    <CampaignIcon className={classes.icon} />
                </IconButton>

                <Box
                    sx={{
                        marginTop: "80px",
                    }}
                >
                    <Typography variant="h6" align="center">
                        Oprime el botón si necesitas ayuda, nos contactaremos contigo lo
                        antes posible.
                    </Typography>
                </Box>
            </Box>
        </Fragment>
    );
};

export default RequestHome;
