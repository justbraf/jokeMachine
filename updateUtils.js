import { myJokesColl } from "./myMongo.js"

const updateJoke = (res, data, id) => {
    id = Number(id)
    myJokesColl.updateOne({"id":id},{
        $set:data
    })
    .then(resp=>{
        res.status(200).json({"message":resp})
    })
    .catch(err=>{
        res.status(200).json({"error":err})
    })
}

export {updateJoke}