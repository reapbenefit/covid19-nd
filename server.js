const Keycloak = require('keycloak-connect');
const session = require('express-session');
const express = require('express')
const path = require('path');

/**
 * For Db connect and
 */
const { validationResult } = require('express-validator');
const crypto = require('crypto');
const expressSanitizer = require('express-sanitizer');
const _ = require('underscore');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const axios = require('axios');
const delay = require('await-delay');
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

app.use(helmet());
app.use(expressSanitizer());
app.use(bodyParser.json({ limit: '30mb' }));


// serve the static files
app.use('/', express.static(path.join(__dirname, '/client/dist/Neighbourhood/')));
app.use('/home', keycloak.protect(), express.static(path.join(__dirname, '/client/dist/Neighbourhood/')));
// protect test route with the keycloak
// app.get('/test', keycloak.protect(),  (req, res) =>  {
//     res.send("OK")
// });


// protect special route with the realm role 'special'
app.get('/api/v1/user/data/read', keycloak.checkSso(), (req, res) => {
    // console.log(JSON.stringify(req.kauth.grant.access_token.content));
    // console.log('////////////////////');
    console.log(req);
    console.log(req.kauth.grant.access_token.content);
    console.log(req.kauth.grant.access_token.content.groups);
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



/**
 * Rreq Params validation
 */
function sanitize_input(req, input_object) {
    return new Promise(function (resolve, reject) {
        try {
            Object.keys(input_object).forEach(function (key) {
                if (input_object[key] == undefined || input_object[key] == null) {

                }
                if (input_object[key].constructor == Array) {
                    var sanitized_array = [];
                    input_object[key].forEach(function (element, index) {
                        if (element.constructor == Object || element.constructor == Array) {
                            sanitize_input(req, element).then(function (sanitized_output) {
                                element = sanitized_output
                            });
                        }
                        else {

                            if (element == Boolean) {
                                var input = element.toString()
                                if (input.includes("false")) {
                                    element = false
                                }
                                else if (input.includes("true")) {
                                    element = true
                                }
                                else {
                                    element = element.toString()
                                    element = element.replace(/%/g, '');
                                }
                            }
                            else if (element.constructor == Number) {
                                var input = element.toString()
                                var res = input.match(/(\d+)/);
                                res = parseInt(res)
                                element = res
                            }
                            else {
                                if (element == '' || element == "") {
                                    element = "";
                                }
                                else {
                                    element = req.sanitize(element)
                                    if (element) {
                                        element = element.replace(/&amp;/g, '&');
                                        element = element.replace(/%7C/g, '');
                                        element = element.replace(/%26/g, '');
                                        element = element.replace(/%22/g, '');
                                        element = element.replace(/%3B/g, '');
                                        element = element.replace(/%27/g, '');
                                        element = element.replace(/%3D/g, '');
                                        element = element.replace(/%25/g, '');
                                        element = element.replace(/%29/g, '');
                                        element = element.replace(/'='/g, '');
                                    }
                                }
                            }
                        }
                        sanitized_array.push(element);

                    });
                    input_object[key] = sanitized_array;
                }
                else if (input_object[key].constructor == Object) {
                    sanitize_input(req, input_object[key]);
                }
                else if (input_object[key].constructor == Boolean) {
                    var input = input_object[key].toString()
                    if (input.includes("false")) {
                        input_object[key] = false
                    }
                    else if (input.includes("true")) {
                        input_object[key] = true
                    }
                    else {
                        input_object[key] = input_object[key].toString()
                        input_object[key] = input_object[key].replace(/%/g, '');
                    }
                }
                else if (input_object[key].constructor == Number) {
                    var input = input_object[key].toString()
                    var res = input.match(/(\d+)/);
                    res = parseInt(res)
                    input_object[key] = res
                }
                else {
                    if (input_object[key] == '' || input_object[key] == "") {
                        input_object[key] = "";
                    }
                    else {
                        input_object[key] = req.sanitize(input_object[key]);
                        if (input_object[key]) {
                            input_object[key] = input_object[key].replace(/&amp;/g, '&');
                            input_object[key] = input_object[key].replace(/%7C/g, '');
                            input_object[key] = input_object[key].replace(/%26/g, '');
                            input_object[key] = input_object[key].replace(/%22/g, '');
                            input_object[key] = input_object[key].replace(/%3B/g, '');
                            input_object[key] = input_object[key].replace(/%27/g, '');
                            input_object[key] = input_object[key].replace(/%3D/g, '');
                            input_object[key] = input_object[key].replace(/%25/g, '');
                            input_object[key] = input_object[key].replace(/%29/g, '');
                            input_object[key] = input_object[key].replace(/'='/g, '');
                        }
                    }

                }
            });
            resolve(input_object);
        }
        catch (err) {
            console.log("Error occured in sanitizing input object :", err);
            console.log("Warning - Un sanitized Object Propagting ", input_object)
            resolve(input_object);
        }
    })
}


/**
 * MySql Db Connection and service
 * table : self-solve
 */
const mysql = require('mysql');
var connection = mysql.createPool({
    connectionLimit: 100,
    host: 'devlp.solveninja.org',
    user: 'curiouscat',
    password: 'S0lvesm@lld3ntbig',
    database: 'theapp'
});


/**
 * Assign User to take action
 */
app.post('/assignme', async (req, res) => {

    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }

    try {
        var tempReq = JSON.parse(JSON.stringify(req.params));
    }
    catch (err) {
        var tempReq = Object.assign({}, req.params)
        winston.info("Error parsing input");
    }

    // Sanitize User input to avoid xss attacks or mongo injection
    await sanitize_input(req, req.params).then(function (sanitized_output) {
        req.params = sanitized_output;
    });

    var result = {};
    if (!(_.isEqual(tempReq, req.params))) {
        res.status(403);
        result = { "status": 'fail', 'message': 'Error! The input is corrupted.' };
        res.send(result);
    } else if (req.body.username == null) {
        result = { "status": 'fail', "message": 'userName was null.' };
        res.send(result);
    } else {

        /**
         * Table Column's
         * 
         * assigned_timestamp: timestamp
         * assigned_to: varchr(255)
         * closed_at: timestamp
         * closed_by: varchr(255)
         * created_by: varchr(255)
         * id: int(11)
         * logical_delete: int(1)
         * notes: Longtext
         * place_org_id: int(11)
         * sms_status: int(1)
         * status: varchr(255)
         * timestamp: timestamp
         * tracing_ID: varchr(255)
         */
        if (req.body && req.body.data && req.body.data['id'] && req.body['username'] && req.body.data['subcategory']) {
            var place_org_id = req.body.data.id;
            var assigned_to = req.body.username;
            var phone_number = req.body.number;
            var assigned_timestamp = new Date();

            // For Main Table
            var subcategory = req.body.data.subcategory;

            function getmatchingName() {
                var finalName = '';
                switch (subcategory.toLowerCase().trim().replace(/ /g, '')) {
                    case 'food-asked':
                        finalName = 'Food - Assigned';
                        return finalName;
                        break;
                    case 'food-assigned':
                        finalName = 'Food - Assigned';
                        return finalName;
                        break;
                    case 'rations-asked':
                        finalName = 'Rations - Assigned';
                        return finalName;
                        break;
                    case 'rations-assigned':
                        finalName = 'Rations - Assigned';
                        return finalName;
                        break;
                    default:
                        return '';
                        break;
                }
            }

            var retrylevel = 0;
            async function updateMainTable() {
                var finalName = await getmatchingName();
                if (finalName != '') {
                    var form_data = {
                        place_org_subcategory: finalName
                    }
                    connection.query('UPDATE public_data_place_org_table SET ? WHERE place_org_id = ' + place_org_id, form_data, function (err, ss) {
                        if (err) {
                            console.log("Error On update");
                            console.log(err);
                            if (retrylevel < 3) {
                                retrylevel = retrylevel + 1;
                                updateMainTable();
                            } else {
                                result = { "status": 'fail', "message": `Error on Updates M: ${err}` };
                                res.send(result);
                            }
                        } else {
                            retrylevel = 0;
                            result = { "status": 'success', "message": "data Updated successfully M" };
                            res.send(result);
                        }
                    })
                } else {
                    result = { "status": 'success', "message": "subCategory not matched M" };
                    res.send(result);
                }

            }

            connection.query('SELECT * FROM self_solve WHERE place_org_id = ' + place_org_id, function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    result = { "status": 'fail', "message": `Error on Updates : ${err}` };
                    res.send(result);
                } else {
                    console.log(rows);
                    console.log("Data Availabel");
                    if (rows.length == 0) {
                        var records = [[place_org_id, assigned_to, phone_number, assigned_timestamp]];
                        connection.query("INSERT INTO self_solve (place_org_id, assigned_to, phone_number, assigned_timestamp) VALUES ?", [records], function (err, ss, ff) {
                            // if any error while executing above query, throw error
                            if (err) {
                                console.log("Insearting Error");
                                console.log(err);
                                result = { "status": 'fail', "message": `insearting error S: ${err}` };
                                res.send(result);
                            } else {
                                console.log(ss);
                                console.log(ff);
                                console.log("Insearted succesfluuy S");
                                updateMainTable();
                            }
                        });
                    } else {
                        result = { "status": 'fail', "message": `Data already Exists`, 'assigned': true };
                        res.send(result);
                    }

                }
            });

        } else {
            result = { "status": 'fail', "message": `data not proper` };
            res.send(result);
        }
    }

});



/**
 * Close User Action
 */
app.post('/givenbyme', async (req, res) => {

    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }

    try {
        var tempReq = JSON.parse(JSON.stringify(req.params));
    }
    catch (err) {
        var tempReq = Object.assign({}, req.params)
        winston.info("Error parsing input");
    }

    // Sanitize User input to avoid xss attacks or mongo injection
    await sanitize_input(req, req.params).then(function (sanitized_output) {
        req.params = sanitized_output;
    });

    var result = {};
    if (!(_.isEqual(tempReq, req.params))) {
        res.status(403);
        result = { "status": 'fail', 'message': 'Error! The input is corrupted.' };
        res.send(result);
    } else if (req.body.username == null) {
        result = { "status": 'fail', "message": 'userName was null.' };
        res.send(result);
    } else {

        if (req.body && req.body.data && req.body.data['id'] && req.body['username'] && req.body.data['subcategory']) {
            var place_org_id = req.body.data.id;
            var username = req.body.username;



            // For Main Table
            var subcategory = req.body.data.subcategory;

            function getmatchingName() {
                var finalName = '';
                switch (subcategory.toLowerCase().trim().replace(/ /g, '')) {
                    case 'food-asked':
                        finalName = 'Food - Given';
                        return finalName;
                        break;
                    case 'food-assigned':
                        finalName = 'Food - Given';
                        return finalName;
                        break;
                    case 'rations-asked':
                        finalName = 'Rations-Given';
                        return finalName;
                        break;
                    case 'rations-assigned':
                        finalName = 'Rations-Given';
                        return finalName;
                        break;
                    default:
                        return '';
                        break;
                }
            }

            var retrylevel = 0;
            async function updateMainTable() {
                var finalName = await getmatchingName();
                if (finalName != '') {
                    var form_data = {
                        place_org_subcategory: finalName
                    }
                    connection.query('UPDATE public_data_place_org_table SET ? WHERE place_org_id = ' + place_org_id, form_data, function (err, ss) {
                        if (err) {
                            console.log("Error On update");
                            console.log(err);
                            if (retrylevel < 3) {
                                retrylevel = retrylevel + 1;
                                updateMainTable();
                            } else {



                                result = { "status": 'fail', "message": `Error on Updates M: ${err}` };
                                res.send(result);
                            }
                        } else {
                            retrylevel = 0;
                            result = { "status": 'success', "message": "data Updated successfully M" };
                            res.send(result);
                        }
                    })
                } else {
                    result = { "status": 'success', "message": "subCategory not matched M" };
                    res.send(result);
                }
            }



            var form_data = {};
            form_data = {
                closed_by: username,
                closed_at: new Date()
            }
            connection.query('UPDATE self_solve SET ? WHERE place_org_id = ' + place_org_id, form_data, function (err, ss) {
                if (err) {
                    console.log(err);
                    console.log("Error On update");
                    result = { "status": 'fail', "message": `Error on Updates S: ${err}` };
                    res.send(result);
                } else {
                    updateMainTable();
                }
            })

        } else {
            result = { "status": 'fail', "message": `Username / Org_Id not availabel` };
            res.send(result);
        }

    }

});

/**
 * get All Assigned List based n User
 */
app.post('/getassignedlist', async (req, res) => {


    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }

    try {
        var tempReq = JSON.parse(JSON.stringify(req.params));
    }
    catch (err) {
        var tempReq = Object.assign({}, req.params)
        winston.info("Error parsing input");
    }

    // Sanitize User input to avoid xss attacks or mongo injection
    await sanitize_input(req, req.params).then(function (sanitized_output) {
        req.params = sanitized_output;
    });

    var result = {};
    if (!(_.isEqual(tempReq, req.params))) {
        res.status(403);
        result = { "status": 'fail', 'message': 'Error! The input is corrupted.' };
        res.send(result);
    } else if (req.body.username == null) {
        result = { "status": 'fail', "message": 'userName was null.' };
        res.send(result);
    } else {

        if (req.body && req.body['username'] && req.body['username'] != null) {
            var username = req.body.username;
            var query = `SELECT * FROM self_solve WHERE assigned_to = '${username}' AND closed_by IS NULL`;
            connection.query(query, function (err, rows) {
                if (err) {
                    console.log(err);
                    result = { "status": 'fail', "message": `data not fount ${err}` };
                    res.send(result);
                } else {
                    console.log(rows);
                    result = { "status": 'success', "data": rows };
                    res.send(result);
                }
            });

        } else {
            result = { "status": 'fail', "message": 'Username Not Availabel' };
            res.send(result);
        }

    }

});

/**
 * get All Assigned List
 */
app.post('/getAllassignedList', async (req, res) => {


    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }

    try {
        var tempReq = JSON.parse(JSON.stringify(req.params));
    }
    catch (err) {
        var tempReq = Object.assign({}, req.params)
        winston.info("Error parsing input");
    }

    // Sanitize User input to avoid xss attacks or mongo injection
    await sanitize_input(req, req.params).then(function (sanitized_output) {
        req.params = sanitized_output;
    });

    var result = {};
    if (!(_.isEqual(tempReq, req.params))) {
        res.status(403);
        result = { "status": 'fail', 'message': 'Error! The input is corrupted.' };
        res.send(result);
    } else if (req.body.username == null) {
        result = { "status": 'fail', "message": 'userName was null.' };
        res.send(result);
    } else {

        if (req.body && req.body['username'] && req.body['username'] != null) {
            var username = req.body.username;
            var query = `SELECT * FROM self_solve`;
            connection.query(query, function (err, rows) {
                if (err) {
                    console.log(err);
                    result = { "status": 'fail', "message": `data not fount ${err}` };
                    res.send(result);
                } else {
                    console.log(rows);
                    result = { "status": 'success', "data": rows };
                    res.send(result);
                }
            });

        } else {
            result = { "status": 'fail', "message": 'Username Not Availabel' };
            res.send(result);
        }

    }

});

/**
 * getTotalClosedUser count based on UserName
 */
app.post('/getTotalClosedUser', async (req, res) => {

    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }

    try {
        var tempReq = JSON.parse(JSON.stringify(req.params));
    }
    catch (err) {
        var tempReq = Object.assign({}, req.params)
        winston.info("Error parsing input");
    }

    // Sanitize User input to avoid xss attacks or mongo injection
    await sanitize_input(req, req.params).then(function (sanitized_output) {
        req.params = sanitized_output;
    });

    var result = {};
    if (!(_.isEqual(tempReq, req.params))) {
        res.status(403);
        result = { "status": 'fail', 'message': 'Error! The input is corrupted.' };
        res.send(result);
    } else if (req.body.username == null) {
        result = { "status": 'fail', "message": 'userName was null.' };
        res.send(result);
    } else {

        if (req.body && req.body['username'] && req.body['username'] != null) {
            var username = req.body.username;
            // var query = `SELECT * FROM public_data_place_org_table  WHERE place_org_id = '55721' `; 

            var query = `SELECT * FROM self_solve WHERE assigned_to = '${username}' AND closed_by IS NOT NULL`;

            connection.query(query, function (err, rows) {
                if (err) {
                    console.log(err);
                    result = { "status": 'fail', "message": `data not fount ${err}` };
                    res.send(result);
                } else {
                    console.log(rows);
                    result = { "status": 'success', "data": rows };
                    res.send(result);
                }
            });

        } else {
            result = { "status": 'fail', "message": 'Username Not Availabel' };
            res.send(result);
        }

    }

});

/**
 * getTotalClosedUser count based on UserName
 */
app.get('/testconnect', async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }

    try {
        var tempReq = JSON.parse(JSON.stringify(req.params));
    }
    catch (err) {
        var tempReq = Object.assign({}, req.params)
        winston.info("Error parsing input");
    }

    // Sanitize User input to avoid xss attacks or mongo injection
    await sanitize_input(req, req.params).then(function (sanitized_output) {
        req.params = sanitized_output;
    });

    var result = {};
    if (!(_.isEqual(tempReq, req.params))) {
        res.status(403);
        result = { "status": 'fail', 'message': 'Error! The input is corrupted.' };
        res.send(result);
    } else {

        var query = `SELECT * FROM self_solve`;
        connection.query(query, function (err, rows) {
            if (err) {
                console.log(err);
                result = { "status": 'fail', "message": `data not fount ${err}` };
                res.send(result);
            } else {
                console.log(rows);
                result = { "status": 'success', "data": rows };
                res.send(result);
            }
        });




        // var request = {
        //     params: {
        //         place_org_id: 136005,
        //         closed_at: new Date(),
        //         closed_by: 'testngouser'
        //     }
        // }
        // axios.post('https://es.solveninja.org/updatePlaceClosed?place_org_id=136005&closed_at=2020-05-06&closed_by=testngouser')
        //         .then(function (response) {
        //             // handle success
        //             console.log(response);
        //         })
        //         .catch(function (error) {
        //             // handle error
        //             console.log(error);
        //         })
        //         .then(function () {
        //             // always executed
        //             result = { "status": 'success', "data": 'test' };
        //             res.send(result);
        //         });


        // var form_data = {
        //     closed_by: "testngoadmin",
        //     closed_at: new Date(),
        //     assigned_to: "testngoadmin",
        //     assigned_timestamp: new Date(),
        //     place_org_id: 136005
        // }
        // connection.query('show tables', function (err, ss) {
        //     if (err) {
        //         console.log("Error On update");
        //         result = { "status": 'fail', "message": `Error on Updates${err}` };
        //         res.send(result);
        //     } else {
        //         console.log(ss);
        //         result = { "status": 'success', "message": "data Updated successfully" };
        //         res.send(result);
        //     }
        // })

    }

});


app.listen(3000, function () {
    console.log('Listening at http://localhost:3000');
    console.log('serving angular app from -> ', path.join(__dirname, '/client/dist/Neighbourhood/'));
});

// CHARACTER_MAXIMUM_LENGTH: null
// CHARACTER_OCTET_LENGTH: null
// CHARACTER_SET_NAME: null
// COLLATION_NAME: null
// COLUMN_COMMENT: ""
// COLUMN_DEFAULT: null
// COLUMN_KEY: "PRI"
// COLUMN_NAME: "place_org_id"
// COLUMN_TYPE: "int(11)"
// DATA_TYPE: "int"
// DATETIME_PRECISION: null
// EXTRA: "auto_increment"
// IS_NULLABLE: "NO"
// NUMERIC_PRECISION: 10
// NUMERIC_SCALE: 0
// ORDINAL_POSITION: 1
// PRIVILEGES: "select,insert,update,references"
// TABLE_CATALOG: "def"
// TABLE_NAME: "public_data_place_org_table"
// TABLE_SCHEMA: "theapp"

// form_data = {
//     closed_by: null,
//     closed_at: null
// }
// connection.query('UPDATE self_solve SET ? WHERE place_org_id = 136005', form_data, function (err, ss) {
//     if (err) {
//         console.log("Error On update");
//         result = { "status": 'fail', "message": `Error on Updates${err}` };
//         res.send(result);
//     } else {
//         // updateMainTable();
//         result = { "status": 'success', "message": "data Updated successfully" };
//         res.send(result);
//     }
// })