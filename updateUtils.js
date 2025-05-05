import { myJokesColl } from "./myMongo.js"

const updateJoke = (res, data, id) => {
    id = Number(id)
    if (data._id)
        delete data._id
    myJokesColl.updateOne({ "id": id }, {
        $set: data
    })
        .then(resp => {
            res.status(200).json({ "message": resp })
        })
        .catch(err => {
            res.status(200).json({ "error": err.message })
        })
}

const updateRating = (res, id, thumbs) => {
    id = Number(id)
    let val = 0
    // Check if it is a thumbs up (add one) or thumbs down (subtract one), anything else should not change the value
    if (thumbs == "up")
        val = 1
    else if (thumbs == "down")
        val = -1
    // The $inc operator updates the specified field by the provided value
    myJokesColl.updateOne({ "id": id }, {
        $inc: { likes: val }
    })
        .then(resp => {
            res.status(200).json({ "message": resp })
        })
        .catch(err => {
            res.status(200).json({ "error": err.message })
        })
}


export { updateJoke, updateRating }