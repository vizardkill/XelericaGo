import React, { lazy, Suspense } from "react";

//Librerias
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Toaster } from "react-hot-toast";

//Middlewares
import Auth from "./common/Middlewares/Auth";
import ErrorBoundary from "./common/Middlewares/ErrorBoundary";

//Componentes
import Loading from "./common/Loader";

//===============================================================================================================================================
//========================================== Rutas principales  =================================================================================
//===============================================================================================================================================
const RequestRoutes = lazy(() => import("./routes/Requests.routes"));

//===============================================================================================================================================
//========================================== Otras rutas ========================================================================================
//===============================================================================================================================================
const PageNotFound = lazy(() => import("./common/Error/404"));
const Login = lazy(() => import("./pages/Login"));

const Routes = () => {
    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    return (
        <Auth>
            <Toaster position="bottom-left" />

            <Router>
                <ErrorBoundary>
                    <Suspense fallback={<Loading />}>
                        <Switch>
                            <Route path="/" exact component={Login} />

                            <RequestRoutes path="/home" />

                            <Route path="*" component={PageNotFound} />
                        </Switch>
                    </Suspense>
                </ErrorBoundary>
            </Router>
        </Auth>
    );
};

export default Routes;
