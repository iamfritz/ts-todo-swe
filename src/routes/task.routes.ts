import express from 'express';
const router = express.Router();

const authenticator = require("../middleware/authJWT");

const {
  getAllTask,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");

router
  .route("/")
  .get(getAllTask)  
  .post(createTask);

router
  .route("/:id")
  .get(getTask)
  .delete( deleteTask)
  .put(updateTask);

export default router;
