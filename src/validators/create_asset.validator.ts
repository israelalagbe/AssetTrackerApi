import { validationResult, check } from "express-validator";
import validatorMiddleware from "../middlewares/validator.middleware";

const createAssetValidator = () => {
  return [
    check("name")
      .isString()
      .withMessage("name must be a string")
      .notEmpty()
      .withMessage("name must be provided"),
    check("latitude")
      .notEmpty()
      .withMessage("latitude must be provided")
      .isNumeric()
      .withMessage("latitude must be a number"),
    check("longitude")
      .notEmpty()
      .withMessage("longitude must be provided")
      .isNumeric()
      .withMessage("longitude must be a number"),
    validatorMiddleware,
  ];
};

export default createAssetValidator;
