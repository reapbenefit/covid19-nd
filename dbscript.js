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

// Test Router
router.get('/', (req, res) => {
    res.send({
        msg: 'Hi There!'
    });
});

//User Form Submit
router.post('/user-form-submit', (req,res)=> {
    console.log(req.body);
    res.send({
        msg:'Received'
    })
});

router.get('/get-public-table', (req,res)=>{

    connection.query("SELECT * FROM public_data_place_org_table", (error, rows, fields) => {
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
connection.query("SELECT DISTINCT place_org_subcategory FROM public_data_place_org_table WHERE place_org_category = 'Service'", (error, rows, fields) => {
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



