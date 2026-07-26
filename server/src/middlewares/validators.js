const { validationResult, body } = require("express-validator");
const { HttpException } = require("../config/exception");

const signupWithGoogleValidationRules = [
  body("authToken")
    .notEmpty()
    .withMessage("authentication token is required")
    .isString()
    .withMessage("authentication token must be a string"),
];

const signupWithGithubValidationRules = [
  body("code")
    .notEmpty()
    .withMessage("authentication code is required")
    .isString()
    .withMessage("authentication code must be a string"),
];

const checkValidationResult = (req, _res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    next(new HttpException(400, errors?.array()[0]?.msg || "validation error"));
  }

  next();
};

module.exports = {
  checkValidationResult,
  signupWithGoogleValidationRules,
  signupWithGithubValidationRules,
};
