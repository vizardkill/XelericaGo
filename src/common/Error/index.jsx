import React from "react";

//Componentes de Material UI
import { Grid, Box, Container } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/core";

//Componentes de Lottie-player
import Player from "react-lottie-player";

//Estilos de Material UI
import { makeStyles } from "@material-ui/styles";

const errorPageStyles = makeStyles((theme) => ({
    player: {
        position: "relative",
        height: "500px",
        width: "500px",

        [theme.breakpoints.down("sm")]: {
            height: "150px",
            width: "180px",
        },
    },
    box: {
        [theme.breakpoints.down("sm")]: {
            height: "30vh",
        },
    },
}));

const ErrorPage = ({ severity, title, msg }) => {
    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    const classes = errorPageStyles();

    return (
        <Container>
            <Grid container direction="row" spacing={2}>
                <Grid item xs={12}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-end",
                        }}
                        className={classes.box}
                    >
                        <Box className={classes.player}>
                            <Player
                                play
                                loop
                                animationData={require("../../static/json/animationError.json")}
                            />
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Alert severity={severity}>
                        <AlertTitle>
                            <b>{title}</b>
                        </AlertTitle>
                        {msg}
                    </Alert>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ErrorPage;
