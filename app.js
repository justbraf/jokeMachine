import express from 'express'
import cors from 'cors'
import { PORT } from './config.js'
import { addNewJoke } from './createUtil.js'
import { getJoke, getJokes } from './readUtils.js'
import { delJoke } from './deleteUtils.js'
import { updateJoke, updateRating } from './updateUtils.js'

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
    getJoke(res, Number(jid))
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

app.put('/update/:id', (req, res) => {
    const data = req.body
    updateJoke(res, data, req.params.id)
})

// Route for updating the likes of a joke by its id
app.put('/rate/:id/:thumbs', (req, res) => {
    const id = req.params.id
    const thumbs = req.params.thumbs
    updateRating(res, id, thumbs)
})