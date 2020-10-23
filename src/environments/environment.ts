// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  maps_api_key: 'AIzaSyCZmlNYWBzg2rO-6An3VpcZU3OUjLmlRCw',
  // baseURL: 'https://api.solveninja.org/api/v1/',
      baseURL:  'https://rb-ingress.study-circle.in/api/v1/',
   //baseURL:  'http://localhost:5000/api/v1/',
//baseURL:'http://7a745d34e2e3.ngrok.io/api/v1/',


 
   msgKey: '219214ADc65L586C5b17f50f',

  keycloak: {
    issuer: 'https://auth.solveninja.org/auth/',
    // issuer: 'https://rb-ingress.study-circle.in/auth/',
    realm: 'webapp', 
    clientId: 'rb-frontend'
  }
};
