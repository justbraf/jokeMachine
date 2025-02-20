import { myJokesColl } from "./myMongo.js"

let addNewJoke = (res, data) => {
    myJokesColl.insertOne(data)
        .then(resp => {
            console.log(resp)
            res.status(200).json({ "message": "success" })
        })
        .catch(err => {
            res.status(200).json({ "error": err })
        })
}

export { addNewJoke }