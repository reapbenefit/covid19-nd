import { KeycloakService } from "keycloak-angular";
import { environment } from "../environments/environment";

export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        await keycloak.init({
          config: {
            url: environment.keycloak.issuer,
            realm: environment.keycloak.realm,
            clientId: environment.keycloak.clientId,
          },
          initOptions: {
            //onLoad: "login-required",
            checkLoginIframe: false,
          },
          bearerExcludedUrls: ["/userdetails", "/addfunction", "/formbuilder", "/addforms"],
        });
        resolve();
      } catch (error) {
        console.log("error", error);
        reject(error);
      }
    });
  };
}
