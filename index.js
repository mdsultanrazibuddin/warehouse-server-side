const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require ('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

// user = dbuser1
// password = 9aqvkv4J21mmyHgR



const uri = "mongodb+srv://dbuser1:9aqvkv4J21mmyHgR@cluster0.b3os3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log('db connection');
  // perform actions on the collection object
  client.close();
});


app.get('/', (req, res) => {
    res.send('running server');

});

app.listen(port, () =>{
    console.log('listening to port', port);
})



