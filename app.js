import express from 'express'
import { PORT } from './config.js'

const app = express()

app.listen(PORT, () => {
    console.info(`Server started on port ${PORT}`)
})

app.get("/", (req, res) => {
    res.send("Hello World")
})
app.get("/hello", (req, res) => {
    res.status(200).json({
        "firstname": "Bob",
        "lastname": "Builder"
    })
})