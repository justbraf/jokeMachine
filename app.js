import express from 'express'
import cors from 'cors'
import { PORT } from './config.js'
import { addNewJoke } from './createUtil.js'
import { getJokes } from './readUtils.js'
import { delJoke } from './deleteUtils.js'
import { updateJoke } from './updateUtils.js'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(PORT, () => {
    console.info(`Server started on port ${PORT}`)
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

app.post("/new", (req, res) => {
    const data = req.body
    addNewJoke(res, data)
})

app.get("/jokes", (req, res) => {
    getJokes(res)
})

app.delete("/remove/id/:id", (req, res) => {
    let data = {}
    data.id = Number(req.params.id)
    delJoke(res, data)
})
app.delete("/remove/_id/:id", (req, res) => {
    let data = {}
    data._id = req.params.id
    delJoke(res, data)
})

app.put('/update/:id', (req, res)=>{
    const data = req.body
    updateJoke(res, data, req.params.id)
})