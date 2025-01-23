import express from 'express'
import { PORT, JOKES, MDBURI } from './config.js'
import { MongoClient, ServerApiVersion } from "mongodb"

const app = express()

const client = new MongoClient(MDBURI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})

const myDatabase = client.db("sample_supplies")
const myCollection = myDatabase.collection("sales")

app.listen(PORT, () => {
    console.info(`Server started on port ${PORT}`)
})

app.get('/sales/:limit/:skip', (req, res) => {
    const myLimit = Number(req.params.limit)
    const mySkip = Number(req.params.skip)
    myCollection.find({}, {limit: myLimit, skip: mySkip}).toArray()
    .then(resp=>{
        let docs = []
        resp.forEach(elem=>{
            delete elem.customer
            delete elem.saleDate
            elem.status = "sold"
            // elem["status"] = "sold"
            docs.push(elem)
        })
        res.status(200).json(docs)
    })
    .catch(err=>{
        console.log("an error occured", err)
        res.sendStatus(500)
    })
})

app.get("/", (req, res) => {
    res.send("Please check documentation for usage.")
})

app.get("/joke", (req, res) => {
    let index = Math.floor(Math.random() * JOKES.length)
    res.status(200).json(JOKES[index])
})

app.get("/joke/:id", (req, res) => {
    const jid = req.params.id
    if (isNaN(jid)) {
        res.status(200).json({
            "error": "Invalid entry"
        })
        return
    }
    const found = JOKES.find((joke) => joke.id == jid)
    if (!found) {
        res.status(200).json({
            "error": "Invalid joke id"
        })
        return
    }
    res.status(200).json(found)
})