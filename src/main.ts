import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import Keycloak from 'keycloak-js';

import { AppConfig } from './app/app.config';

export function getImgUrl() {
  return AppConfig.settings;
}
const providers = [
  {provide: 'Image_URL', useFactory: getImgUrl, deps: []}
];

platformBrowserDynamic(providers).bootstrapModule(AppModule)
.catch(err => console.error(err));
//  'https://rb-ingress.study-circle.in/auth/'
/*let initOptions = {
  url: 'https://rb-ingress.study-circle.in/auth/', realm: 'webapp', clientId: 'rb-frontend'
}

let keycloak = Keycloak(initOptions);

keycloak.init({ onLoad: "login-required" }).success((auth) => {
  if (!auth) {
    window.location.reload();
  } else {
    console.log(auth, "Authenticated");
  }

  //bootstrap after authentication is successful.
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));


  localStorage.setItem("ang-token", keycloak.token);
  localStorage.setItem("ang-refresh-token", keycloak.refreshToken);

  setTimeout(() => {
    keycloak.updateToken(70).success((refreshed) => {
      if (refreshed) {
        console.debug('Token refreshed' + refreshed);
      } else {
        console.warn('Token not refreshed, valid for '
          + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
      }
    }).error(() => {
      console.error('Failed to refresh token');
    });


  }, 60000)

}).error(() => {
  console.error("Authenticated Failed");
});*/