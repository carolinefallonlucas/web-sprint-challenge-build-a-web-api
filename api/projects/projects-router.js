// Write your "projects" router here!


const router = require("express").Router()
const Projects = require("./projects-model")

router.get("/", async (req, res) =>
{
    Projects.get()
        .then(data =>
        { 
        res.status(200).json(data)
        })
    
    .catch (err => {
        res.status(500).json({erro: err.message})
    })
})

module.exports = router

