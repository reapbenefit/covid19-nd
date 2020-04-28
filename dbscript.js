var express = require('express');
var mysql = require('mysql');
var app = express();
var connection = mysql.createConnection({
host:'devlp.solveninja.org',
user:'curiouscat',
password:'S0lvesm@lld3ntbig',
database:'theapp'
});

connection.connect( (err) =>{
    if(err){
console.log(err);
    } else{
        console.log('Connected');
    }
});


app.get('/', (req, resp)=>{
connection.query("SELECT * FROM public_data_place_org_table", (error, rows, fields) => {
    if(error){
        console.log('error');
    }
    else{
        console.log(rows);
    }
})
});

app.listen(1300);

