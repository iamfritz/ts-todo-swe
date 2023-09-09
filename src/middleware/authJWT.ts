import express, { Request, Response, NextFunction } from 'express';
const jwt = require("jsonwebtoken");

const authenticator = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //   get the token from the authorization header
    const token = await req.headers.authorization.split(" ")[1];
    //console.log(token);

    // Check if no token
    if (!token) {
      res
        .status(401)
        .json({ status: "error", message: "No token, authorization denied" });
    }

    // Verify token
    const JWT_SECRET = process.env.JWT_SECRET || "SECRET-TOKEN";
    try {
      jwt.verify(token, JWT_SECRET, (error, decoded) => {
        if (error) {
          res.status(401).json({
            status: "error",
            message: "Token is not valid",
          });
        } else {
          //console.log(decoded);
          req.user = decoded;
          next();
        }
      });
    } catch (err: any) {
      console.error("Invalid Token: " + token);
      console.error(err);
      res.status(500).json({ status: "error", message: "Invalid Token" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ status: "error", message: "Unauthorized Request" });
  }
};

//module.exports = { authenticator};
module.exports = authenticator;