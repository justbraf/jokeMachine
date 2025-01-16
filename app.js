import express from 'express'
import { PORT, JOKES } from './config.js'

const app = express()

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

app.get("/joke/:id", (req, res) =>{
    const jid = req.params.id
    if (isNaN(jid)) {
        res.status(200).json({
            "error": "Invalid entry"
        })
        return
    }
    const found = JOKES.find((joke) => joke.id == jid)
    if (!found){
        res.status(200).json({
            "error": "Invalid joke id"
        })
        return
    }
    res.status(200).json(found)
})