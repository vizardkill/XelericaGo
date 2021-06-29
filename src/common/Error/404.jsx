import React from "react";

//Componentes de Lottie-player
import Player from "react-lottie-player";

//Componentes de Material UI
import { Grid, Box, Container } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/core/";

//Estilos de Material UI
import { makeStyles } from "@material-ui/styles";

const pageNotFoundStyles = makeStyles((theme) => ({
    player: {
        position: "relative",
        height: "500px",
        width: "1000px",

        [theme.breakpoints.down("sm")]: {
            height: "150px",
            width: "300px",
        },
    },
    box: {
        [theme.breakpoints.down("sm")]: {
            height: "30vh",
        },
    },
}));

const PageNotFound = () => {
    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    const classes = pageNotFoundStyles();
    return (
        <Container>
            <Grid
                container
                direction="column"
                spacing={2}
                alignContent="center"
                alignItems="center"
            >
                <Grid item xs={12}>
                    <Box
                        className={classes.box}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-end",
                        }}
                    >
                        <Box className={classes.player}>
                            <Player
                                play
                                loop
                                animationData={require("../../static/json/animation404.json")}
                            />
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Alert severity="error">
                        <AlertTitle>
                            <b>404 Not Found</b>
                        </AlertTitle>
                        La página a la que está intentado acceder no existe, por favor
                        verifica la URL e intente nuevamente, en caso de que el error
                        persista, por favor comuníquese con el área de TI.
                    </Alert>
                </Grid>
            </Grid>
        </Container>
    );
};

export default PageNotFound;
