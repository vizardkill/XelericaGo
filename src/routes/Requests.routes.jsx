import React, { lazy, Suspense } from "react";

//Librerias
import { Switch, Route, useLocation } from "react-router-dom";

//Componentes
import Main from "../common/Main";
import Loading from "../common/Loader";
import PrivateRoute from "../common/Middlewares/PrivateRoute";

//===============================================================================================================================================
//========================================== Otros Componentes ==================================================================================
//===============================================================================================================================================

const Home = lazy(() => import("../pages/Requests/index"));
const PageSuccess = lazy(() => import("../pages/Requests/pageSuccess"));

const RequestsRoutes = ({ path }) => {
    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const location = useLocation();

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    return (
        <PrivateRoute path={path}>
            <Main>
                <Suspense fallback={<Loading />}>
                    <Switch location={location}>
                        <Route
                            path="/home"
                            exact
                            component={() => (
                                <div className="animate__animated animate__fadeIn">
                                    <Home />
                                </div>
                            )}
                        />

                        <Route
                            path="/home/success"
                            exact
                            component={() => (
                                <div className="animate__animated animate__fadeIn">
                                    <PageSuccess />
                                </div>
                            )}
                        />
                    </Switch>
                </Suspense>
            </Main>
        </PrivateRoute>
    );
};

export default RequestsRoutes;
