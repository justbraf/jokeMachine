import { myJokesColl } from "./myMongo.js"

let addNewJoke = (res, data) => {
    if (!data.joke)
        return res.status(200).json({ "error": "Error with data" })
    // for key id
    // data.id or data["id"]
    if (!data.id) {
        myJokesColl.findOne({}, {
            sort: { id: -1 },
            projection: { id: 1, _id: 0 }
        })
            .then(resp => {
                data.id = Number(resp.id) + 1
                // res.status(200).json(data)
                insertDoc(res, data)
            })
            .catch(err => {
                res.status(200).json({ "error": err.message })
            })
    }
    else
        insertDoc(res, data)


}

let insertDoc = (res, data) => {
    myJokesColl.insertOne(data)
        .then(resp => {
            // console.log(resp)
            res.status(200).json({ "message": "success" })
        })
        .catch(err => {
            res.status(200).json({ "error": err })
        })
}

export { addNewJoke }