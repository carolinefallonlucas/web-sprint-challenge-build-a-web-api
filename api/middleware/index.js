const Actions = require("../actions/actions-model");
const Projects = require("../projects/projects-model");

function logger(req, res, next) {
  const time = new Date().toISOString();
  console.log(`New ${req.method} request to ${req.url} at ${time}`);
  next();
} 

async function validateActionId(req, res, next) {
  const { id } = req.params;
  const validId = await Actions.get(id);
  if (validId) {
    next();
  } else {
    res.status(404).json({ err: `ID ${id} does not exist!` });
  }
}

async function validateAction(req, res, next) {
  try {
    const action = await req.body;
    if (action && action.notes && action.description && action.project_id) {
      req.action = action;
      console.log(req.action);
      next();
    } else if (!action.notes) {
      res.status(400).json({ err: "Please provide notes" });
    } else if (!action.description) {
      res.status(400).json({ err: "Please provide a description" });
    }
  } catch (error) {
    res.status(500).json({ err: "Unable to post action" });
  }
}

async function validateProject(res, req, next) {
  try {
    const edit = await req.req.body;
    if (!edit.name || !edit.description) {
      res.status(400).json({ err: "Required field missing" });
    } else {
      next();
    }
  } catch (error) {
    res.res.status(400).json({ err: "Required field missing" });
  }
}

async function validateProjectId(res, req, next) {
  const projId = await req.req.params.id;
  let validProjId = await Projects.get(projId);
  try {
    if (!validProjId) {
      res.res
        .status(404)
        .json({ err: `Project with id ${projId} does not exist` });
    } else {
      req.project = validProjId;
      next();
    }
  } catch (error) {
    res
      .status(400)
      .json({ err: `Project with id ${validProjId} does not exist` });
  }
}

module.exports = {
  logger,
  validateActionId,
  validateAction,
  validateProjectId,
  validateProject
};