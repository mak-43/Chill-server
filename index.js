const express = require('express');
const cors = require('cors');
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


app.use(express.json())
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }));

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bxqusfm.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try {
        await client.connect()

        const videoCollection = client.db('Chill').collection('video')
        const addCollection = client.db('Chill').collection('add')

        //post video
      app.post('/video',async(req,res)=>{
        const video=req.body 
        const result=await videoCollection.insertOne(video) 
        res.send(result)
      })

       //get  video 
       app.get('/allvideo',  async (req, res) => {
        const users = await videoCollection.find().toArray()
        res.send(users)
    })

    //delete video 
    
    app.delete('/video/:id',async(req,res)=>{
        const id=req.params.id 
        const query={_id:ObjectId(id)}
        const result=await videoCollection.deleteOne(query)
        res.send(result)
    })
    //post add 
    app.post('/add',async(req,res)=>{
        const add=req.body 
        const result=await addCollection.insertOne(add) 
        res.send(result)
      })
      //get post 
      app.get('/alladd',  async (req, res) => {
        const users = await addCollection.find().toArray()
        res.send(users)
    })
    //delete add 

  app.delete('/add/:id',async(req,res)=>{
        const id=req.params.id 
        const query={_id:ObjectId(id)}
        const result=await addCollection.deleteOne(query)
        res.send(result)
    })
     

    
        




    }
    finally {

    }

}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Running Server !!!')
})
app.listen(port, () => {
    console.log('Listening to port', port)
})