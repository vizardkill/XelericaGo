import { Component } from "react";
import packageJson from "../../../package.json";
global.appVersion = packageJson.version;

const semverGreaterThan = (versionA, versionB) => {
    // code from above snippet goes here
};

export default class CacheBuster extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            isLatestVersion: false,
            error: false,
            refreshCacheAndReload: () => {
                console.log("Clearing cache and hard reloading...");
                if (caches) {
                    // Service worker cache should be cleared with caches.delete()
                    caches.keys().then(function (names) {
                        for (let name of names) caches.delete(name);
                    });
                }
                // delete browser cache and hard reload
                window.location.reload(true);
            },
        };
    }

    componentDidMount() {
        fetch(`${window.location.protocol}//${window.location.host}/meta.json`)
            .then((response) => response.json())
            .then((meta) => {
                const latestVersion = meta.version;
                const currentVersion = global.appVersion;

                const shouldForceRefresh = semverGreaterThan(
                    latestVersion,
                    currentVersion
                );

                if (shouldForceRefresh) {
                    console.log(
                        `%cNota: La pagina fue refrezcada para obtener la nueva versión: ${latestVersion}`,
                        "background: url(https://www.choucairtesting.com/wp-content/uploads/2021/01/192.png) 0 0 no-repeat; background-size: 50px 50px; padding-left: 80px; padding-right: 80px; padding-bottom: 40px; font-size: 15px; font-weight: 500;"
                    );

                    console.log(
                        "%cSi no estas autorizado como desarrollador por la compañía absténgase de manipular la información suministrada por la consola, de lo contrario podría incurrir en un delito informático de acuerdo con la Ley 1273 de 2009 del estado colombiano.",
                        "padding-left: 80px; padding-right: 80px; padding-bottom: 40px; font-size: 15px; font-weight: 500;"
                    );

                    this.setState({
                        ...this.state,
                        loading: false,
                        isLatestVersion: false,
                    });
                } else {
                    console.log(
                        `%cNota: Actualmente posees la última versión del aplicativo - ${latestVersion}.`,
                        "background: url(https://www.choucairtesting.com/wp-content/uploads/2021/01/192.png) 0 0 no-repeat; background-size: 50px 50px; padding-left: 80px; padding-right: 80px; padding-bottom: 40px; font-size: 15px; font-weight: 500;"
                    );

                    console.log(
                        "%cSi no estas autorizado como desarrollador por la compañía absténgase de manipular la información suministrada por la consola, de lo contrario podría incurrir en un delito informático de acuerdo con la Ley 1273 de 2009 del estado colombiano.",
                        "padding-left: 80px; padding-right: 80px; padding-bottom: 40px; font-size: 15px; font-weight: 500;"
                    );

                    this.setState({
                        ...this.state,
                        loading: false,
                        isLatestVersion: true,
                    });
                }
            })
            .catch((error) => {
                this.setState({
                    ...this.state,
                    error: true,
                    errorMsg: `Error el obtener el meta.json: ${error.message}`,
                });
            });
    }

    render() {
        const {
            loading,
            isLatestVersion,
            refreshCacheAndReload,
            error,
            errorMsg,
        } = this.state;

        if (error) {
            throw new Error(errorMsg);
        }

        return this.props.children({ loading, isLatestVersion, refreshCacheAndReload });
    }
}
