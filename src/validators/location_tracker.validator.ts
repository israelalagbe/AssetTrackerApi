import validatorMiddleware from "../middlewares/validator.middleware";
import * as ws from "ws";
import { Request, NextFunction } from "express";

const locationTrackerValidator = (client: ws, req: Request, next: NextFunction) => {
  if(!req.query.client_longitude){
    client.send(
      JSON.stringify({
        event: "error",
        data: "client_longitude is required",
      })
    );
    client.close();
  }
  if(!req.query.client_latitude){
    client.send(
      JSON.stringify({
        event: "error",
        data: "client_latitude is required",
      })
    );
    client.close();
  }
  next()
};

export default locationTrackerValidator;
