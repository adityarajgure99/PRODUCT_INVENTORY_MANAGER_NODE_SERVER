require('dotenv').config()
//console.log(process.env)
const sql = require('mssql');
var DbUserName = process.env.DbUser
var DbUserPassword = process.env.DbUserPassword
var DbName = process.env.DbName
var DbServerName = process.env.DbServerName

console.log(DbUserName, DbUserPassword, DbName,
DbServerName)

const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static('public'))
var request = new sql.Request();


var config = {
    user: DbUserName,
    password: DbUserPassword,
    server: DbServerName,
    database: DbName
    };
    sql.connect(config, function (err) {
    if (err) console.log(err);
    console.log('Connected to Database!');
   // queryDatabase()
    });

app.post('/products', function(req,res) 
    {
        console.log(req.body)
        var q="INSERT INTO products (pName,pPrice,pQuant) VALUES ('" +req.body.pName+"',"+req.body.pPrice+","+req.body.pQuant+")"
        console.log(q)
        const promise=runQuery(q)
        promise.then((result) => {
            //console.log(result);    
            res.send("PRODUCT INSERTED SUCCESSFULLY") 
        });
        
    })

    app.get('/products', function(req,res) 
    {
        console.log(req.body)
        var query="SELECT * from products"
        console.log(query)
        const promise=runQuery(query)
        promise.then((result) => {
            //console.log(result);    
            res.send(result) 
        });
        
    })

    app.get('/products/ID', function(req,res) 
    {
        console.log(req.body)
        var query="SELECT * from products where ID ="+req.body.ID
        console.log(query)
        const promise=runQuery(query)
        promise.then((result) => {
            //console.log(result);    
            res.send(result) 
        });
        
    })

    app.put('/products/ID', function(req,res) 
    {
        console.log(req.body)
        var query="UPDATE products SET pName='"+req.body.pName+"',pPrice="+req.body.pPrice+",pQuant="+req.body.pQuant+" WHERE ID="+req.body.ID
        console.log(query)
        const promise=runQuery(query)
        promise.then((result) => {
            //console.log(result);    
            res.send("PRODUCT UPDATED SUCCESSFULLY") 
        });
        
    })

    app.delete('/products/ID', function(req,res) 
    {
        console.log(req.body)
        var query="DELETE from products where ID ="+req.body.ID
        console.log(query)
        const promise=runQuery(query)
        promise.then((result) => {
            //console.log(result);    
            res.send("PRODUCT DELETED SUCCESSFULLY") 
        });
        
    })

var server = app.listen(port, function () 
                {
                    console.log(`Server listening on port ${port}`)
                })
  


function runQuery(q) {
    var qRes
    request=new sql.Request()
    request.query(q , function(err,result)
    {
        if (err) console.log("ERROR: " + err)
        console.log(result)
    if(result.recordset !=null)  
        qRes=JSON.stringify(result.recordset)
    })
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(qRes);
        }, 2000);
    });
}

function queryDatabase() {
    // create Request object
    var request = new sql.Request();
    // query to the database and get the records
    request.query('select * from STATS', function (err, result) 
    {
    if (err) console.log("ERROR: " + err)
    console.log("rows returned: " + result.recordsets[0].length)
    for(let i=0; i<result.recordsets[0].length; i++){
    console.log(result.recordsets[0][i]);
    }
    console.log(result.recordsets[0].length)
    })
    }
        