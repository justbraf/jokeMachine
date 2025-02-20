import express from 'express'
import { PORT } from './config.js'
import { addNewJoke } from './createUtil.js'
import { getJokes } from './readUtils.js'

const app = express()

app.use(express.json())

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