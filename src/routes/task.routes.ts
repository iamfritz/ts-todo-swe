import express from 'express';
const router = express.Router();

const authenticator = require("../middleware/authJWT");

const {
  getAllTask,
  getTask,
  getUserTask,
  getLogUserTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");

router
  .route("/")
  .get(getAllTask)  
  .post(authenticator, createTask);

router
  .route("/me")
  .get(authenticator, getLogUserTask);

router
  .route("/user/:id")
  .get(authenticator, getUserTask);  

router
  .route("/:id")
  .get(getTask)
  .delete(authenticator, deleteTask)
  .put(authenticator, updateTask);

export default router;
