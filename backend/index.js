
var path = require('path');
var express = require('express');
var app = express();

// The database
//const MongoClient = require('mongodb').MongoClient;
const { MongoClient } = require("mongodb");
//const uri = "mongodb://test:password@127.0.0.1:27017/quote";
// Unsecured database
const uri = "mongodb://127.0.0.1:27017";

var options = {
    index: "myWebPage.html"
  };

var dir = path.join(__dirname, '../frontend');



app.get('/api', function(req, res){
    res.send("Yes we have an API now")
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });
  

app.post('/api/quote', function(req, res){
    var n = req.query.quotesNumber
    var s = req.query.quotesText
    console.log("Storing quote number: "+n+ " and item " + s )
    console.log("Mongo URI is "+uri)

    // Database stuff
    // Create a new MongoClient
    const client = new MongoClient(uri);
    async function run() {
    try {
        console.log('Start the database stuff');
        //Write databse Insert/Update/Query code here..
        var dbo = client.db("quote");
        var myobj = { quotesNumber: n, quotesText: s };
        await dbo.collection("quotes").insertOne(myobj, function(err, res) {
            if (err) {
                console.log(err); 
                throw err;
            }
        }); 
        console.log('End the database stuff');

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
    }
    run().catch(console.dir);
    res.send("stored "+n)
});

app.get('/api/quote', function(req, res){
    console.log("getting the quote")
    console.log("Mongo URI is "+uri)
    var response = "";
    const client = new MongoClient(uri);
    async function run() {
        try {
            const dbo = client.db("quote");
            const query = {};
            const options = {
                sort: { quotesNumber: 1  },
                projection: { quotesNumber: 1, quotesText: 1 },
            };
        
            const cursor = dbo.collection("quotes").find(query, options);
            if ((await cursor.countDocuments) === 0) {
                console.log("No documents found!");
                response = ""
            }
            // prepare the response as an array
            const response = await cursor.toArray();
            res.send(response)
        } finally {
            await client.close();
        }
    }
    run().catch(console.dir);
});
app.delete('/api/quote', function(req, res){
    console.log("deleting the current quote")
    console.log("Mongo URI is "+uri)
    const client = new MongoClient(uri);
    async function run() {
        try {
            console.log("starting up the database")
            const dbo = client.db("quote");
            const query = {};
           
            console.log("deleting the collection")
            await dbo.collection("quotes").deleteMany(query, function(err, result) {
                if (err) throw err;
            });
 
        } finally {
            await client.close();
        }
    }
    run().catch(console.dir);
    res.send("Deleted list")
});

app.use(express.static(dir, options));

// 404 page
app.use(function ( req, res, next) {
    res.send('This page does not exist!')
});

app.listen(8000, function () {
    console.log('Listening on http://localhost:8000/');
});