import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

//Componentes de Material UI
import {
    ThemeProvider,
    createTheme,
    StyledEngineProvider,
} from "@material-ui/core/styles";

const themeOptions = createTheme();

ReactDOM.render(
    <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themeOptions}>
            <App />
        </ThemeProvider>
    </StyledEngineProvider>,
    document.getElementById("root")
);
