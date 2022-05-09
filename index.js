const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require ('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.b3os3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri);

async function run(){
     try{
        await client.connect();
        const productCollection = client.db('wareHouse').collection('product');
        const productsCollection = client.db('wareHouse').collection('products');
        console.log('all route working')
        app.get('/product', async (req, res) =>{
            const page =parseInt(req.query.page)
            const size =parseInt(req.query.size)
            const query = {};
            const cursor = productCollection.find(query);
            let products;
            if(page || size){
                products = await cursor.skip(page*size).limit(size).toArray();
            }
            else{
                products = await cursor.toArray();
            }
         
            res.send(products);
        })

        // find
        app.get('/products', async (req, res) =>{
            
            const query = {};
            const cursor = productsCollection.find(query);
            const products = await cursor.toArray();
            
            
             
         
            res.send(products);
        })

        // findOne
        app.get('/product/:id', async (req, res) =>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const product = await productCollection.findOne(query);
           
            res.send(product);
        })
       

        // insertOne

        app.post('/product', async(req, res) =>{
            const newProduct = req.body;
            const result = await productCollection.insertOne(newProduct);
            res.send(result)
        })

        // delete
        app.delete('/product/:id', async (req, res) =>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await productCollection.deleteOne(query);
           
            res.send(result);
        })

        // product count
        app.get('/productCount', async(req, res) =>{
            const query = {};
            const cursor= productCollection.find(query);
            const count = await cursor.count();
            res.send({count}) 
        })
     }
     finally{

     }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('running server');

});

app.listen(port, () =>{
    console.log('listening to port', port);
})



