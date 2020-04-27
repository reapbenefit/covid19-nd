const Keycloak = require('keycloak-connect');
const session = require('express-session');
const express = require('express')
const path = require('path');

// creating session objec to store user sessions in cookie
var memoryStore = new session.MemoryStore();
// var keycloak = new Keycloak({ store: memoryStore });


// initilaize keycloak with express session storage
var keycloak = new Keycloak({ store: memoryStore });

const app = express();

// add session to app
app.use(session({
    secret: 'BeALongSecret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));

// add keycloak as a middlewaee to the app
app.use(keycloak.middleware());

// serve the static files
app.use('/', express.static(path.join(__dirname, '/client/dist/Neighbourhood/')));
app.use('/home', keycloak.protect(), express.static(path.join(__dirname, '/client/dist/Neighbourhood/')));
// protect test route with the keycloak
// app.get('/test', keycloak.protect(),  (req, res) =>  {
//     res.send("OK")
// });


// protect special route with the realm role 'special'
app.get('/api/v1/user/data/read', keycloak.checkSso(),  (req, res) =>  {
console.log(JSON.stringify(req.kauth.grant.access_token.content));
// console.log('////////////////////');

let response = {};
response.data = {};
response.data.name = req.kauth.grant.access_token.content.name;
response.data.username = req.kauth.grant.access_token.content.preferred_username;
response.data.first_name = req.kauth.grant.access_token.content.given_name;
response.data.last_name = req.kauth.grant.access_token.family_name;
response.data.userrole = req.kauth.grant.access_token.content.realm_access;
// console.log(response);
res.send(response);
});


// app.get('/', (req, res) => [
//     res.send("OK")
// ])

// add keycloak as middleware with logout configuration to delete user sessions on logout
app.use(keycloak.middleware({ logout: '/logout' }));


app.listen(3000, function () {
    console.log('Listening at http://localhost:5600');
    console.log('serving angular app from -> ', path.join(__dirname, '/client/dist/Neighbourhood/'));
});