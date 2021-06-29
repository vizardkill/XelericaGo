import React, { useState, useCallback, useRef, useEffect, useContext, memo } from "react";

//Context
import { AuthContext } from "../../common/Middlewares/Auth";

//Librerias
import { useForm, Controller } from "react-hook-form";
import { Redirect } from "react-router-dom";
import validator from "validator";
import axios from "axios";
import Cookies from "js-cookie";

//Toast
import { toast } from "react-hot-toast";

//Componentes de Material UI
import {
    Grid,
    Box,
    Paper,
    TextField,
    Button,
    InputAdornment,
    Container,
    Typography,
    FormControlLabel,
    Checkbox,
    LinearProgress,
    CircularProgress,
} from "@material-ui/core";

//Iconos de Material UI
import { AccountCircle as AccountCircleIcon, Lock as LockIcon } from "@material-ui/icons";

//Estilos de Material UI
import { makeStyles } from "@material-ui/styles";

//Imagenes
import LogoImg from "../../static/img/logoXelerica.png";

const loginStyles = makeStyles((theme) => ({
    linearProgress: {
        position: "absolute",
        width: "100%",
        borderRadius: "10px 10px 0 0",
    },
    button: {
        position: "relative",
    },
    circularProgress: {
        position: "absolute",
        margin: "auto",
    },
    checked: {
        fontSize: "12px",
    },
    copyright: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        marginRight: "auto",
        marginLeft: "auto",
        textAlign: "center",
    },
    gridOne: {
        padding: theme.spacing(3),
        position: "relative",
    },
    gridTwo: {
        backgroundColor: "#1B0333",
        borderRadius: "0 7px 7px 0",
    },
    player: {
        position: "relative",
        width: "532px",
        margin: "auto",
    },
    backImage: {
        height: "100vh",
        width: "100vw",
        background: "linear-gradient(180deg, #001C38, white 300%)",
        overflow: "hidden",
        position: "absolute",
    },
    container: {
        display: "flex",
        height: "100vh",
        width: "inherit",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },
    paper: {
        position: "relative",
        borderRadius: "7px",
        padding: "10px",
        [theme.breakpoints.up("md")]: {
            maxWidth: "50%",
        },
        margin: "auto",
    },
}));

const Login = () => {
    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { token, handlerChangeData } = useContext(AuthContext);

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({ mode: "onChange" });

    //===============================================================================================================================================
    //========================================== Referencias ========================================================================================
    //===============================================================================================================================================
    const handlerChangeDataRef = useRef(handlerChangeData);

    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [loading, setLoading] = useState(false);
    const [flagSubmit, setFlagSubmit] = useState(false);

    const [data, setData] = useState({
        strUser: "",
        strPass: "",
        bitRecordar: false,
        strApp: "ASIGNACION",
    });

    //===============================================================================================================================================
    //========================================== Funciones  =========================================================================================
    //===============================================================================================================================================
    const onSubmitData = (data) => {
        setData((prevState) => ({
            ...prevState,
            ...data,
        }));

        setFlagSubmit(true);
    };

    const submitData = useCallback(
        async (signalSubmitData) => {
            setLoading(true);
            setFlagSubmit(false);

            await axios(
                {
                    method: "GET",
                    baseURL: `${process.env.REACT_APP_API_GLPI_PROT}://${process.env.REACT_APP_API_GLPI_HOST}${process.env.REACT_APP_API_GLPI_PORT}`,
                    url: `${process.env.REACT_APP_API_GLPI_LOGIN}`,
                    headers: {
                        "Content-Type": "application/json",
                        "App-Token": `${process.env.REACT_APP_API_APPTOKEN}`,
                    },
                    params: {
                        get_full_session: true,
                    },
                    auth: {
                        username: data.strUser,
                        password: data.strPass,
                    },
                },
                {
                    cancelToken: signalSubmitData.token,
                }
            )
                .then((res) => {
                    if (!res.data.session_token) {
                        throw new Error("El servicio no esta disponible");
                    }

                    setLoading(false);

                    if (data.bitRecordar) {
                        localStorage.setItem("session_token", res.data.session_token);
                    }

                    if (
                        !process.env.REACT_APP_NODE_ENV ||
                        process.env.REACT_APP_NODE_ENV !== "production"
                    ) {
                        Cookies.set("session_token", res.data.session_token);
                    } else {
                        Cookies.set("session_token", res.data.session_token, {
                            domain: ".xelerica.com",
                        });
                    }

                    handlerChangeDataRef.current("token", res.data.session_token);
                    handlerChangeDataRef.current("strData", res.data.session);
                })
                .catch((error) => {
                    if (!axios.isCancel(error)) {
                        let msg;

                        if (error.response) {
                            msg = error.response.data[1];
                        } else if (error.request) {
                            msg = error.message;
                        } else {
                            msg = error.message;
                        }

                        console.error(msg);
                        toast.error(msg);

                        setLoading(false);
                    }
                });
        },
        [data]
    );

    //===============================================================================================================================================
    //========================================== useEffects =========================================================================================
    //===============================================================================================================================================
    useEffect(() => {
        let signalSubmitData = axios.CancelToken.source();
        if (flagSubmit) {
            submitData(signalSubmitData);
        }
        return () => {
            signalSubmitData.cancel("Petición abortada.");
        };
    }, [flagSubmit, submitData]);

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    //#NOTE: variable que se utiliza para aplicar estilos personalizados de material ui
    const classes = loginStyles();

    if (token) {
        return <Redirect to="/home" />;
    }

    return (
        <div className={classes.backImage}>
            {loading ? <LinearProgress className={classes.linearProgress} /> : null}
            <Container className={classes.container}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <img
                        src={LogoImg}
                        alt="logo choucair"
                        style={{ width: "100%", height: "auto" }}
                    />
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Paper className={classes.paper}>
                        <Grid container direction="row">
                            <Grid item xs={12} className={classes.gridOne}>
                                <Grid
                                    container
                                    direction="row"
                                    spacing={2}
                                    component="form"
                                    onSubmit={handleSubmit(onSubmitData)}
                                    noValidate
                                >
                                    <Grid item xs={12}>
                                        <Controller
                                            id="txt_strUser"
                                            name="strUser"
                                            defaultValue={data.strUser}
                                            render={({
                                                field: { name, value, onChange },
                                            }) => (
                                                <TextField
                                                    name={name}
                                                    label="Usuario"
                                                    helperText={
                                                        errors?.strUser?.message ||
                                                        "Digita tu usuario de Xelerica Go"
                                                    }
                                                    error={errors?.strUser ? true : false}
                                                    fullWidth
                                                    required
                                                    variant="standard"
                                                    autoComplete="on"
                                                    disabled={loading}
                                                    onChange={(e) => onChange(e)}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <AccountCircleIcon />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    value={value}
                                                />
                                            )}
                                            control={control}
                                            rules={{
                                                required:
                                                    "Por favor digita tu usuario de xelerica Go",
                                                validate: (value) => {
                                                    if (
                                                        !validator.isLength(value, {
                                                            min: 0,
                                                            max: 80,
                                                        })
                                                    ) {
                                                        return "El campo de usuario sobrepasa el limite de longitud permitida.";
                                                    }
                                                },
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Controller
                                            id="txt_strPass"
                                            name="strPass"
                                            defaultValue={data.strPass}
                                            render={({
                                                field: { name, value, onChange },
                                            }) => (
                                                <TextField
                                                    name={name}
                                                    label="Contraseña"
                                                    type="password"
                                                    helperText={
                                                        errors?.strPass?.message ||
                                                        "Digita tu contraseña"
                                                    }
                                                    error={errors?.strPass ? true : false}
                                                    autoComplete="on"
                                                    variant="standard"
                                                    fullWidth
                                                    required
                                                    onChange={(e) => onChange(e)}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <LockIcon />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    disabled={loading}
                                                    value={value}
                                                />
                                            )}
                                            control={control}
                                            rules={{
                                                required:
                                                    "Por favor digita tu contraseña",
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Controller
                                            id="cbx_bitRecordar"
                                            name="bitRecordar"
                                            defaultValue={data.bitRecordar}
                                            render={({
                                                field: { name, value, onChange },
                                            }) => (
                                                <FormControlLabel
                                                    name={name}
                                                    label="¿Recordar mi usuario?"
                                                    disabled={loading}
                                                    classes={{
                                                        label: classes.checked,
                                                    }}
                                                    control={
                                                        <Checkbox
                                                            color="secondary"
                                                            onChange={(e) =>
                                                                onChange(e.target.checked)
                                                            }
                                                            checked={value}
                                                        />
                                                    }
                                                />
                                            )}
                                            control={control}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            color="primary"
                                            type="submit"
                                            disabled={loading}
                                            className={classes.button}
                                        >
                                            ingresar
                                            {loading ? (
                                                <CircularProgress
                                                    className={classes.circularProgress}
                                                    size={24}
                                                />
                                            ) : null}
                                        </Button>
                                    </Grid>

                                    {/* <Grid item xs={12}>
                                        <Typography
                                            variant="caption"
                                            component="div"
                                            align="center"
                                        >
                                            <a
                                                href="https://corporativo.choucairtesting.com/mesadeayuda/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    color: "black",
                                                }}
                                            >
                                                ¿Olvidaste tu contraseña?
                                            </a>
                                        </Typography>
                                    </Grid> */}
                                </Grid>

                                <Box className={classes.copyright}>
                                    <Box>
                                        <Typography variant="caption">
                                            Todos los derechos reservados - 2021 ©
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </Container>
        </div>
    );
};

export default memo(Login);
