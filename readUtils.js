import { myJokesColl } from "./myMongo.js"

let getJokes = (res) => {
    myJokesColl.find().toArray()
        .then(resp => {
            res.status(200).json(resp)
        })
}

const getJoke = (res, jid) => {
    const query = {
        "id": jid
    }
    myJokesColl.findOne(query)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            const message = {
                "error": err.message
            }
            res.status(200).json(message)
        })
}

export { getJokes, getJoke }