// Write your "actions" router here!


const router = require("express").Router()
const Actions = require("./actions-model")

router.get("/", (req, res) =>
{
    Actions.get()
        .then(data =>
        { 
        res.status(200).json(data)
        })
    
    .catch (err => {
        res.status(500).json({err: err.message})
    })
})