const UserService = require("../services/user.service");
const RoleService = require("../services/role.service");

const auth = require("../middleware/authJWT");
const bcrypt = require("bcrypt");
const saltRounds = 10; // Number of salt rounds, higher is more secure but slower
const jwt = require("jsonwebtoken");

// Function to hash a password
async function hashPassword(password: String) {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error: any) {
    console.error('Error hashing password:', error);
    throw error;
  }

}

let result = {
  status: "error",
  message: "",
};

// register endpoint
const registerUser = async (req: Request, res: Response) => {

  const { email, password, name } = req.body;
  const hashedPassword = await hashPassword(password);

  try {
    // Find roles by name
    const foundRoles = await RoleService.getAll({ name: { $in: ["user"] } });

    // Create the user and associate roles
    const data = {
      email,
      name,
      password : hashedPassword, // Remember to hash the password before saving it
      roles: foundRoles.map((role) => role._id),
    };
    
    const newUser = await UserService.create(data);
    // save the new user
    if (newUser) {
      result["status"] = "success";
      result["data"] = newUser;

      res.json(result);
    } else {
      result["status"] = "error";
      result["message"] = `Unable to add a new record.`;
      res.status(401).json(result);
    }
  } catch (error: any) {
    result["status"] = "error";
    result["message"] = error.message;

    res.status(500).json(result);
  }
    
};

// login endpoint
const loginUser = async (req: Request, res: Response) => {
    
  if (!req.body.email || !req.body.password) {
    result["message"] = "Email Address and Password is required.";

    response.status(401).json(result);
  }
  // check if email exists
  UserService.getByField({ email: req.body.email })

    // if email exists
    .then((user) => {
      // compare the password entered and the hashed password found
      bcrypt
        .compare(req.body.password, user.password)

        // if the passwords match
        .then((passwordCheck) => {
          // check if password matches
          if (!passwordCheck) {
            result["message"] = "Passwords does not match";

            res.status(401).json(result);
          }

          const JWT_SECRET = process.env.JWT_SECRET || "SECRET-TOKEN";
          //   create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            JWT_SECRET,
            { expiresIn: "24h" }
          );

          //   return success response
          res.status(200).send({
            status: "success",
            message: "Login Successful",
            data: {
              email: user.email,
              token
            }
          });
        })
        // catch error if password does not match
        .catch((error) => {
          result["message"] = "Passwords does not match";

          res.status(401).json(result);
        });
    })
    // catch error if email does not exist
    .catch((e) => {
      result["message"] = "Email Address not found.";

      res.status(401).json(result);
    });
};

// userinfo endpoint
const userInfo = async (req: Request, res: Response) => {
  let result = {
    status: "error",
    message: "",
    data: {},
  };

  try {
    const userId = req.user.userId;
    const data = await UserService.get(userId);
    if (data) {
      result["status"] = "success";
      result["data"] = req.user;
      res.json(result);
    } else {
      result["status"] = "error";
      result["message"] = `Record not found.`;

      res.status(401).json(result);
    }
  } catch (error: any) {
    result["status"] = "error";
    result["message"] = error.message;

    res.status(500).json(result);
  }
};


module.exports = {
  registerUser,
  loginUser,
  userInfo,
};
