const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const compression = require('compression');
var mysql = require('mysql');

app.use(compression());

app.use(bodyParser.json({ limit: '10mb' }));    // limit : 10mb is required for File upload
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header("Access-Control-Allow-Methods", "PUT");
    next();
});

var connection = mysql.createConnection({
    host:'devlp.solveninja.org',
    user:'curiouscat',
    password:'S0lvesm@lld3ntbig',
    database:'theapp'
    });

var responseObj = {
        status: '',
        msg: '',
        body: null
    };

app.use('/', router);

//public_data_place_org_table Form Submit
router.post('/user-form-submit', (req,res)=> {
    let formData = req.body;
    console.log(formData);
    connection.query(`INSERT INTO public_data_place_org_table (place_org_id,place_org_name,place_org_address,place_org_lat,place_org_long,pol_locale_id,place_org_category,place_org_subcategory,ward_id,ac_id,city_id,place_org_person_incharge,place_org_number,place_org_jurisdiction,info,impact,flagged_as_erronous,logical_delete) VALUES ("${formData.place_org_id}","${formData.place_org_name}","${formData.place_org_address}","${formData.place_org_lat}","${formData.place_org_long}",NULL,"${formData.place_org_category}","${formData.place_org_subcategory}","${formData.ward_id}","${formData.ac_id}","${formData.city_id}",NULL,"${formData.place_org_number}","${formData.place_org_jurisdiction}","${formData.info}",NULL,"0","0")`, (err, resp) =>{
            if(err){
                res.send(err);
            }
            else{
                res.send(resp);
            }
    });
});

router.get('/get-public-table', (req,res)=>{

    connection.query("SELECT * FROM public_data_place_org_table", (error, rows, fields) => {
        if(error){
            console.log('error');
        }
        else{
            res.send(rows);
        }
    });
});

router.get('/individual-details', (req,res)=>{

    connection.query("SELECT * FROM bng_food LIMIT 20", (error, rows, fields) => {
        if(error){
            console.log('error');
        }
        else{
            res.send(rows);
        }
    });
});


//Edit Form Submit
router.post('/edit-form-submit', (req,res)=> {
    let formData = req.body;
    console.log(formData);


    connection.query(`update public_data_place_org_table set place_org_category = "${formData.category}", place_org_subcategory = "${formData.subcategory}", ward_id = "${formData.ward_id}", city_id = "${formData.city_id}", place_org_number = "${formData.org_number}", info = "${formData.info}", impact = "${formData.impact}" where place_org_id = "${formData.org_id}"`, (error, rows, fields) => {
        if(error){
            res.send({
                msg: 'Error'
            });
            console.log(error);
        }
        else{
            res.send({
                msg: 'Success'
            });
            console.log(rows);
        }
    })

});

router.get('/get-case-stats', (req,res)=>{

    connection.query("SELECT * FROM self_solve", (error, rows, fields) => {
        if(error){
            console.log('error');
        }
        else{
            res.send(rows);
        }
    })

})

router.get('/get-org-stats', (req,res)=>{

    connection.query("SELECT * FROM bng_food", (error, rows, fields) => {
        if(error){
            console.log('error');
        }
        else{
            res.send(rows);
        }
    })

})

//type localhost:8080 in browser to make a query
app.get('/', (req, res)=>{
    
connection.query("select * from bng_food", (error, rows, fields) => {
    if(error){
        console.log('error');
    }
    else{
        console.log(rows);
    }
})
});

app.listen(8080 ,() =>{
    console.log('\n\n');
    console.log('***********************');
    console.log('Listening on port 8080!');
    console.log('***********************');
    connection.connect( (err) =>{
            if(err){
                console.log(err);
            } else{
                console.log('Connected');
            }
        });
});