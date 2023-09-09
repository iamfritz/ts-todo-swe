import express from 'express';
const router = express.Router();

const authenticatorKey = require("../middleware/authKey");
const authenticator = require("../middleware/authJWT");

const {
  getAllUser,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require("../controllers/user.controller");
const {
  userInfo,
  registerUser,
  loginUser
} = require("../controllers/auth.controller");

router
  .route("/")
  .get(authenticator, getAllUser)
  .post(authenticator, createUser);

//get log user
router.get("/info", authenticator, userInfo);

//register and login
router.post("/register", authenticatorKey, registerUser);
router.post("/login", authenticatorKey, loginUser);

router
  .route("/:id")
  .get(authenticator, getUser)
  .delete(authenticator, deleteUser)
  .put(authenticator, updateUser);

router.use((req, res, next) => {
  res.status(400).json({ error: "Request not found" });
});

export default router;