import React from "react";

//Librerias
import Player from "react-lottie-player";

//Componentes de Material UI
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const pageSuccessStyles = makeStyles((theme) => ({
    animation: {
        width: "500px",
        margin: "auto",
        [theme.breakpoints.down("sm")]: {
            width: "auto",
        },
    },
}));

const PageSuccess = () => {
    const classes = pageSuccessStyles();

    return (
        <Grid container direction="row">
            <Grid item xs={12}>
                <Typography
                    align="center"
                    variant="h5"
                    style={{ color: "#168505", marginTop: "100px" }}
                >
                    Tu solicitud fue satisfactoria
                </Typography>
            </Grid>

            <Grid item xs={12} alignItems="center">
                <Player
                    play
                    loop
                    className={classes.animation}
                    animationData={require("../../static/json/animationSuccessRequest.json")}
                />
            </Grid>

            <Grid item xs={12}>
                <Typography align="center"  variant="h6">
                    Uno de nuestros expertos se comunicara contigo para atenderte,
                    agradecemos que estés atento a tu teléfono y correo electrónico.
                </Typography>
            </Grid>
        </Grid>
    );
};

export default PageSuccess;
