import express, { Router, Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator"

const validatorMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const messages = []
    if (!validationResult(req).isEmpty()) {
      const errors = validationResult(req).array()
      for (const i of errors) {
        messages.push(i)
      }
      return res.status(400).json({errors})
    }
    return next();
}

export default validatorMiddleware;