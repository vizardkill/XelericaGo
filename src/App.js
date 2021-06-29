import React, { useMemo, useState, useEffect, createContext } from "react";

//css
import "./static/css/login.css";

//Librerias
import Routes from "./Router";
import { isIE } from "react-device-detect";
import Player from "react-lottie-player";

//Componentes de Material UI
import { CssBaseline, Typography, useMediaQuery } from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

//Componente de Material Lab
import { LocalizationProvider } from "@material-ui/lab";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";

//Componentes de DateFns
import { es } from "date-fns/locale";

//Componente de Permisos
import { AbilityContext } from "./config/Can";
import { Ability } from "@casl/ability";
import CacheBuster from "./common/Middlewares/CacheBuster";

const ability = new Ability();
export const AppContext = createContext();

const App = () => {
    const [bitDarkMode, setBitDarkMode] = useState(true);

    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

    useEffect(() => {
        let bitDarkMode = prefersDarkMode;

        setBitDarkMode(bitDarkMode);
    }, [prefersDarkMode]);

    const themeOptions = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: "light",
                    primary: {
                        main: "#5BC0DE",
                        light: "#0288D1",
                        dark: "#031E3A",
                        contrastText: "#ffff",
                    },
                    secondary: {
                        main: "#ED6F17",
                    },
                    divider: "#BDBDBD",
                },
            }),
        []
    );

    if (isIE) {
        return (
            <div className="container">
                <div className="item">
                    <Player
                        play
                        loop
                        animationData={require("./static/json/animationMaintenance.json")}
                        style={{ height: "400px", width: "800px" }}
                    />
                </div>

                <div>
                    <Typography
                        component="h5"
                        variant="h5"
                        gutterBottom
                        style={{ color: "#459fc2" }}
                    >
                        <b>Navegador no soportado.</b>
                    </Typography>
                </div>

                <div>
                    <Typography component="p" variant="subtitle1">
                        Lo sentimos, está aplicación solo puede ser ejecutada en
                        navegadores de ultima generación, por favor intenta abrirla en un
                        navegador diferente.
                    </Typography>
                </div>
            </div>
        );
    }

    return (
        <CacheBuster>
            {({ loading, isLatestVersion, refreshCacheAndReload }) => {
                if (loading) return null;

                if (!loading && !isLatestVersion) {
                    refreshCacheAndReload();
                }

                return (
                    <AppContext.Provider
                        value={{
                            setBitDarkMode,
                            bitDarkMode,
                        }}
                    >
                        <ThemeProvider theme={themeOptions}>
                            <AbilityContext.Provider value={ability}>
                                <CssBaseline />

                                <LocalizationProvider
                                    dateAdapter={AdapterDateFns}
                                    locale={es}
                                >
                                    <Routes />
                                </LocalizationProvider>
                            </AbilityContext.Provider>
                        </ThemeProvider>
                    </AppContext.Provider>
                );
            }}
        </CacheBuster>
    );
};

export default App;
