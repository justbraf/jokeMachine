import { myJokesColl } from "./myMongo.js"

let getJokes = (res) => {
    myJokesColl.find().toArray()
        .then(resp => {
            res.status(200).json(resp)
        })
}

export { getJokes }