const Keycloak = require('keycloak-connect');
const session = require('express-session');
const express = require('express')
const path = require('path');

const router = express.Router();
const bodyParser = require('body-parser');
const compression = require('compression');
var mysql = require('mysql');


/**
 * App init section
 */
const app = express();
app.use(compression());
app.use(bodyParser.json({ limit: '10mb' }));    // limit : 10mb is required for File upload
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));


/**
 * keycloak Config
 */
// creating session objec to store user sessions in cookie
var memoryStore = new session.MemoryStore();
// var keycloak = new Keycloak({ store: memoryStore });
// initilaize keycloak with express session storage
var keycloak = new Keycloak({ store: memoryStore });
// add session to app
app.use(session({
    secret: 'BeALongSecret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));
// add keycloak as a middlewaee to the app
app.use(keycloak.middleware());



/**
 * Server Html router with keycloak
 */
// app.use('/', express.static(path.join(__dirname, '/ngx-admin-master/dist/')));
app.use('/', keycloak.protect(), express.static(path.join(__dirname, '/ngx-admin-master/dist/')));



/**
 * Read Loggged In User data;
 */
app.get('/api/v1/user/data/read', keycloak.checkSso(), (req, res) => {
    console.log(JSON.stringify(req.kauth.grant.access_token.content));
    console.log('/////////User data///////////');
    console.log(req);

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


/**
 * Log Out User 
 */
app.use(keycloak.middleware({ logout: '/logout' }));


/**
 * Db Connection
 */
var connection = mysql.createConnection({
    host: 'devlp.solveninja.org',
    user: 'curiouscat',
    password: 'S0lvesm@lld3ntbig',
    database: 'theapp'
});

//public_data_place_org_table Form Submit
app.post('/user-form-submit', (req, res) => {
    let formData = req.body;
    console.log(formData);
    connection.query(`INSERT INTO public_data_place_org_table (place_org_id,place_org_name,place_org_address,place_org_lat,place_org_long,pol_locale_id,place_org_category,place_org_subcategory,ward_id,ac_id,city_id,place_org_person_incharge,place_org_number,place_org_jurisdiction,info,impact,flagged_as_erronous,logical_delete) VALUES ("${formData.place_org_id}","${formData.place_org_name}","${formData.place_org_address}","${formData.place_org_lat}","${formData.place_org_long}",NULL,"${formData.place_org_category}","${formData.place_org_subcategory}","${formData.ward_id}","${formData.ac_id}","${formData.city_id}",NULL,"${formData.place_org_number}","${formData.place_org_jurisdiction}","${formData.info}",NULL,"0","0")`, (err, resp) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(resp);
        }
    });
});

app.get('/get-public-table', (req, res) => {

    connection.query("SELECT * FROM public_data_place_org_table", (error, rows, fields) => {
        if (error) {
            console.log('error');
        }
        else {
            res.send(rows);
        }
    });
});

app.get('/individual-details', (req, res) => {

    connection.query("SELECT * FROM bng_food LIMIT 20", (error, rows, fields) => {
        if (error) {
            console.log('error');
        }
        else {
            res.send(rows);
        }
    });
});


//Edit Form Submit
app.post('/edit-form-submit', (req, res) => {
    let formData = req.body;
    console.log(formData);


    connection.query(`update public_data_place_org_table set place_org_category = "${formData.category}", place_org_subcategory = "${formData.subcategory}", ward_id = "${formData.ward_id}", city_id = "${formData.city_id}", place_org_number = "${formData.org_number}", info = "${formData.info}", impact = "${formData.impact}" where place_org_id = "${formData.org_id}"`, (error, rows, fields) => {
        if (error) {
            res.send({
                msg: 'Error'
            });
            console.log(error);
        }
        else {
            res.send({
                msg: 'Success'
            });
            console.log(rows);
        }
    })

});

app.get('/get-case-stats', (req, res) => {

    connection.query("SELECT * FROM self_solve", (error, rows, fields) => {
        if (error) {
            console.log('error');
        }
        else {
            res.send(rows);
        }
    })

})

app.get('/get-food-stats', (req, res) => {

    connection.query("SELECT * FROM bng_food", (error, rows, fields) => {
        if (error) {
            console.log('error');
        }
        else {
            res.send(rows);
        }
    })

})

app.listen(3000, function () {
    console.log('Listening at http://localhost:3000');
    console.log('serving angular app from -> ', path.join(__dirname, '/client/dist/Neighbourhood/'));
});
