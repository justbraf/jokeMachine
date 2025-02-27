import { ObjectId } from "mongodb"
import { myJokesColl } from "./myMongo.js"

let delJoke = (res, data) => {
    console.log(data)
    if (data._id) {
        data._id = new ObjectId(data._id)
    }
    myJokesColl.deleteOne(data)
        .then(resp => {
            let result = {}
            if (resp.deletedCount)
                result.message = "Record Deleted"
            else
                result.error = "Error Occured"
            res.status(200).json(result)
        })
}

export { delJoke }