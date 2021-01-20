// Write your "actions" router here!
const express = require("express");

const router = express.Router();
const Actions = require("./actions-model");

const {
    validateActionId,
    validateAction,
    validateProjectId,
    validateProject
} = require('../middleware/index')
router.get("/", async (req, res) => {
try {
    const getActions = await Actions.get();  
    res.status(200).json(getActions);

        } catch (err) {
    

    res.status(500).json({ err: "unable to retrieve actions" });
    }
})

module.exports = router 