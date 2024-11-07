import React, { Fragment, useState, useContext, useEffect } from "react";

//Librerias
import {} from "react-timer-hook";

//Context
import { AuthContext } from "../../common/Middlewares/Auth";

//Componentes Material UI
import {
    IconButton,
    Box,
    Typography,
    Button,
    Grid,
    Paper,
    Tooltip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

//Iconos
import {
    Campaign as CampaignIcon,
    Warning as WarningIcon,
} from "@material-ui/icons";

//Componentes
import ModalSetRequest from "./modalSetRequest";

const useStyles = makeStyles((theme) => ({
    rootIconButton: {
        // tus estilos aquí
    },
    icon: {
        // tus estilos aquí
    },
    notificationBox: {
        padding: theme.spacing(2),
        margin: theme.spacing(1),
        display: "flex",
        alignItems: "center",
        backgroundColor: "#fff3cd",
        border: "1px solid #ffeeba",
        borderRadius: "4px",
    },
    warningIcon: {
        marginRight: theme.spacing(2),
        color: "#856404",
    },
    largeNotificationBox: {
        padding: theme.spacing(2),
        margin: theme.spacing(1),
        display: "flex",
        alignItems: "center",
        backgroundColor: "#f8d7da",
        border: "2px solid #f5c6cb",
        borderRadius: "4px",
    },
    largeWarningIcon: {
        marginRight: theme.spacing(2),
        color: "#721c24",
        fontSize: "2rem",
    },
    smallNotificationBox: {
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        display: "flex",
        alignItems: "center",
        backgroundColor: "#e2e3e5",
        border: "1px solid #d6d8db",
        borderRadius: "4px",
        cursor: "pointer",
        minWidth: "30%", // Ajustar el ancho mínimo para que quepan 3 notificaciones en una fila
    },
    horizontalScroll: {
        display: "flex",
        overflowX: "auto",
        padding: theme.spacing(2),
        marginTop: "-15%",
        marginBottom: "30px",
    },
}));

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
    const classesNoti = useStyles();

    const [notificaciones, setNotificaciones] = useState([]);

    useEffect(() => {
        fetch(process.env.REACT_APP_URI_BACKEND + "/notificaciones")
            .then((response) => response.json())
            .then((data) => {
                const newArray = data
                    .map((notificacion) => {
                        if (notificacion.notificacion_activa === 1) {
                            return notificacion;
                        }
                        return null;
                    })
                    .filter((notificacion) => notificacion !== null);

                setNotificaciones(newArray);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

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
                }}
            >
                <Grid container spacing={2}>
                    {notificaciones?.length > 0 && (
                        <Grid item xs={12} md={6}>
                            {notificaciones
                                .filter(
                                    (notificacion) =>
                                        notificacion.notificacion_tipo ===
                                        "EstaticaPrincipal"
                                )
                                .map((notificacion) => (
                                    <Grid
                                        item
                                        xs={12}
                                        key={notificacion.notificacion_id}
                                        sx={{ height: "100%" }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                height: "100%",
                                                justifyContent: "center",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <Paper
                                                className={
                                                    classesNoti.largeNotificationBox
                                                }
                                            >
                                                <WarningIcon
                                                    className={
                                                        classesNoti.largeWarningIcon
                                                    }
                                                />
                                                <Box>
                                                    <Typography
                                                        variant="body1"
                                                        sx={{
                                                            fontSize: "24px",
                                                        }}
                                                    >
                                                        {
                                                            notificacion.notificacion_titulo
                                                        }
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            fontSize: "18px",
                                                        }}
                                                    >
                                                        {
                                                            notificacion.notificacion_mensaje
                                                        }
                                                    </Typography>
                                                </Box>
                                            </Paper>
                                        </Box>
                                    </Grid>
                                ))}
                        </Grid>
                    )}
                    <Grid
                        item
                        xs={12}
                        md={notificaciones?.length === 0 ? 12 : 6}
                    >
                        <Box
                            sx={{
                                width: "inherit",
                                height: "90vh",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Box
                                sx={{
                                    marginBottom: "50px",
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
                                    marginTop: "10px",
                                    maxWidth: "580px",
                                }}
                            >
                                <Typography variant="h6" align="center">
                                    Oprime el botón si necesitas ayuda, nos
                                    contactaremos contigo lo antes posible, si
                                    deseas visualizar tus solicitudes, puedes
                                    oprimir el boton de abajo.
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    marginTop: "50px",
                                }}
                            >
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    href="https://www.xelerica.com/basic/front/ticket.php?is_deleted=0&as_map=0&criteria%5B0%5D%5Blink%5D=AND&criteria%5B0%5D%5Bfield%5D=12&criteria%5B0%5D%5Bsearchtype%5D=equals&criteria%5B0%5D%5Bvalue%5D=all&search=Buscar&itemtype=Ticket&start=0&_glpi_csrf_token=f91021d7228a8afc0e19a08e1d4e510406022a460d5d8282dae59d609d1d2f70"
                                >
                                    consulta de servicios abiertos
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{ paddingBottom: "500px" }}
                            className={classesNoti.horizontalScroll}
                        >
                            {notificaciones
                                .filter(
                                    (notificacion) =>
                                        notificacion.notificacion_tipo !==
                                        "EstaticaPrincipal"
                                )
                                .map((notificacion) => (
                                    <Tooltip
                                        key={notificacion.notificacion_id}
                                        title={
                                            notificacion.notificacion_mensaje
                                        }
                                        arrow
                                    >
                                        <Paper
                                            className={
                                                classesNoti.smallNotificationBox
                                            }
                                        >
                                            <WarningIcon
                                                className={
                                                    classesNoti.warningIcon
                                                }
                                            />
                                            <Box>
                                                <Typography variant="body1">
                                                    {
                                                        notificacion.notificacion_titulo
                                                    }
                                                </Typography>
                                            </Box>
                                        </Paper>
                                    </Tooltip>
                                ))}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Fragment>
    );
};

export default RequestHome;
