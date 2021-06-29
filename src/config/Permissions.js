import { AbilityBuilder } from "@casl/ability";

export default function defineRulesFor(roles, app) {
    const { can, rules } = new AbilityBuilder();

    if (app === "Asignacion") {
        rulesAsignacion(can, roles);
    }

    return rules;
}

const rulesAsignacion = (can, roles) => {
    if (roles) {
        for (let i = 0; i < roles.length; i++) {
            let rol = roles[i].strNombre;

            switch (rol) {
                case "ADMINISTRADOR":
                    can("view", "all");
                    can("view", "Mod_Administracion");
                    can("view", "Mod_SolicitudEgreso");

                    break;

                case "GERENTE":
                    can("view", "Mod_MisTareas");
                    can("view", "Mod_MisSolicitudes");
                    can("view", "Mod_MisMovimientos");
                    can("view", "Mod_ProgressFlow");

                    break;

                case "COMERCIAL":
                    can("view", "Mod_MisTareas");
                    can("view", "Mod_MisSolicitudes");
                    can("view", "Mod_ProgressFlow");

                    break;

                case "SELECCION":
                    can("view", "Mod_Contrataciones");
                    can("view", "Mod_MisTareas");

                    break;

                default:
                    can("view", "Mod_MisTareas");

                    break;
            }
        }
    } else {
        can("view", "Mod_MisTareas");
    }
};
