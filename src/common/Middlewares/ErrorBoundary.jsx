import React from "react";

//Librerias
import { ErrorBoundary } from "react-error-boundary";

//Componentes
import ErrorPage from "../Error/503";

function ErrorFallback({ error, resetErrorBoundary }) {
    return (
        <ErrorPage
            msg="Ha ocurrido un error, por favor escala al área de TI para más información."
            title={error.message}
        />
    );
}

const MiddlewareErrorBoundary = ({ children }) => {
    return <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>;
};

export default MiddlewareErrorBoundary;
