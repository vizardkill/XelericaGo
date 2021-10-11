import React, { useCallback, useContext, useEffect, useState } from "react";

//Context
import { AuthContext } from "../../common/Middlewares/Auth";

//Liberias
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";

//Componentes de Material UI
import {
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    DialogTitle,
    DialogContentText,
    LinearProgress,
    TextField,
    Grid,
    useTheme,
    useMediaQuery,
} from "@material-ui/core";

import { LoadingButton } from "@material-ui/lab";

//Estilos de Material UI
import { makeStyles } from "@material-ui/styles";

const modalDeleteServicioStyles = makeStyles({
    linearProgress: {
        position: "absolute",
        width: "100%",
    },
});

const ModalDeleteServicio = ({ handleClose, open }) => {
    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { token, strInfoUser } = useContext(AuthContext);

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const theme = useTheme();
    const movil = useMediaQuery(theme.breakpoints.down("sm"));
    const { push } = useHistory();

    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({ mode: "onChange" });

    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [data, setData] = useState({
        strTelefono: "",
    });

    const [success, setSuccess] = useState({
        loading: false,
        submitData: false,
    });

    const [flagValidation, setFlagValidation] = useState(false);

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const classes = modalDeleteServicioStyles();

    const onSubmitData = (data) => {
        setData(data);
        setFlagValidation(true);
    };

    const postData = useCallback(
        async (signalSubmitData, data) => {
            setSuccess((prevState) => ({
                ...prevState,
                loading: true,
            }));

            setFlagValidation(false);

            await axios(
                {
                    method: "POST",
                    baseURL: `${process.env.REACT_APP_API_GLPI_PROT}://${process.env.REACT_APP_API_GLPI_HOST}${process.env.REACT_APP_API_GLPI_PORT}`,
                    url: `${process.env.REACT_APP_API_GLPI_SETTICKET}`,
                    headers: {
                        "Content-Type": "application/json",
                        "App-Token": `${process.env.REACT_APP_API_APPTOKEN}`,
                        "Session-Token": token,
                    },
                    data: {
                        input: {
                            users_id: strInfoUser?.glpiID,
                            type: 1,
                            itilcategories_id: 39,
                            requesttypes_id: 6,
                            urgency: 5,
                            impact: 5,
                            priority: 5,
                            name: "Incidencia automática - Botón de llamada",
                            content: `Telefono del usuario: ${data.strTelefono}`,
                        },
                    },
                },
                {
                    cancelToken: signalSubmitData.token,
                }
            )
                .then(async (res) => {
                    if (!res.data.id) {
                        throw new Error(
                            "El servicio no esta disponible, por favor intentalo de nuevo mas tarde"
                        );
                    }

                    var xhr = new XMLHttpRequest();
                    xhr.withCredentials = true;

                    xhr.addEventListener("readystatechange", function () {
                        if (this.readyState === 4) {
                            console.log(this.responseText);
                        }
                    });

                    xhr.open(
                        "GET",
                        "https://api-sms.masivapp.com/SmsHandlers/sendhandler.ashx?action=sendmessage&username=XELERICASAS_Y97KC&password=,DvgS0o9yU&recipient=573058523482&messagedata=Hello%20World,%20please%20visit%20our%20site%20SHORTURL&longMessage=false&url=http%253A%252F%252Fwww.google.com&flash=false&premium=false"
                    );

                    xhr.send();

                    // await axios({
                    //     method: "POST",
                    //     baseURL: "https://api-sms.masivapp.com",
                    //     URL: "/smsv3/sms/messages",
                    //     auth: {
                    //         username: "XELERICASAS_Y97KC",
                    //         password: ",DvgS0o9yU",
                    //     },
                    //     data: {
                    //         To: "573058523482",
                    //         Text: "Test SMS SHORTURL",
                    //         CustomData: "CUST_ID_0125",
                    //         IsPremium: "False",
                    //         IsFlash: "False",
                    //         LongMessage: "True",
                    //         URL: "https://www.masiv.com",
                    //     },
                    // })
                    //     .then(() => {
                    //         toast.success(res.data.message);

                    //         setSuccess(() => ({
                    //             submitData: true,
                    //             loading: false,
                    //         }));
                    //     })
                    //     .catch((error) => {
                    //         if (!axios.isCancel(error)) {
                    //             let msg;

                    //             if (error.response) {
                    //                 msg = error.response.data[1];
                    //             } else if (error.request) {
                    //                 msg = error.message;
                    //             } else {
                    //                 msg = error.message;
                    //             }

                    //             toast.success(res.data.message);

                    //             setSuccess(() => ({
                    //                 submitData: true,
                    //                 loading: false,
                    //             }));

                    //             console.error(msg);
                    //         }
                    //     });
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

                        setSuccess((prevState) => ({
                            ...prevState,
                            loading: false,
                        }));

                        console.error(msg);
                        toast.error(msg);
                    }
                });
        },
        [strInfoUser, token]
    );

    //===============================================================================================================================================
    //========================================== useEffects =========================================================================================
    //===============================================================================================================================================
    useEffect(() => {
        const signalSubmitData = axios.CancelToken.source();

        if (flagValidation) {
            postData(signalSubmitData, data);
        }

        return () => {
            signalSubmitData.cancel("Petición abortada");
        };
    }, [flagValidation, postData, data]);

    useEffect(() => {
        if (success.submitData) {
            push("/home/success");
        }
    }, [success.submitData, push]);

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================

    return (
        <Dialog
            fullScreen={movil ? true : false}
            open={success.loading ? success.loading : open}
            onClose={handleClose}
            fullWidth
            PaperProps={{
                component: "form",
                onSubmit: handleSubmit(onSubmitData),
                noValidate: "novalidate",
            }}
        >
            {success.loading ? (
                <LinearProgress className={classes.linearProgress} />
            ) : null}
            <DialogTitle>Importante</DialogTitle>

            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <DialogContentText>
                            {`Hola ${strInfoUser?.glpifirstname} ${strInfoUser?.glpirealname}, con el fin de brindarte una atención más rápida y efectiva por favor suminístranos la siguiente información: `}
                        </DialogContentText>
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strTelefono}
                            name="strTelefono"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Número de teléfono"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    variant="standard"
                                    type="number"
                                    helperText={
                                        errors?.strTelefono?.message ||
                                        "Digita tu número de teléfono."
                                    }
                                    error={errors?.strTelefono ? true : false}
                                    required
                                    disabled={success.loading}
                                    fullWidth
                                />
                            )}
                            control={control}
                            rules={{
                                required: "Por favor, digita tu número de teléfono.",
                            }}
                        />
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>
                <Button
                    disabled={success.loading}
                    onClick={() => handleClose()}
                    color="inherit"
                    type="button"
                >
                    cancelar
                </Button>

                <LoadingButton color="secondary" type="submit" loading={success.loading}>
                    enviar
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};

export default ModalDeleteServicio;
