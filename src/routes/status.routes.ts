import express, { Request, Response } from 'express';
const router = express.Router()
const packagejson = require('../../package.json');

const routeStatus = function (req: Request, res: Response){
    let status = {
        version: packagejson.version,
        framework_version: packagejson.version,
        description: packagejson.description,
    }
    res.send(status)
}

router
  .route("/")
  .get(routeStatus);

router
  .route("/api")
  .get(routeStatus);

export default router;