import React from "react";

//Componentes de Lottie-player
import Player from "react-lottie-player";

//Componentes de Material UI
import { Grid, Box, Container } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/core";

//Estilos de Material UI
import { makeStyles } from "@material-ui/styles";

const pageMaintenanceStyles = makeStyles((theme) => ({
    player: {
        position: "relative",
        height: "500px",
        width: "700px",

        [theme.breakpoints.down("sm")]: {
            height: "150px",
            width: "225px",
        },
    },
    box: {
        [theme.breakpoints.down("sm")]: {
            height: "30vh",
        },
    },
}));

const Maintenance = () => {
    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    const classes = pageMaintenanceStyles();
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
                                animationData={require("../../static/json/animation503.json")}
                            />
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Alert severity="warning">
                        <AlertTitle>
                            <b>503 Service unavailable</b>
                        </AlertTitle>
                        La página a la que esta intentado acceder, se encuentra en
                        construcción o fura de servicio, contacta con el área de TI para
                        más información.
                    </Alert>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Maintenance;
