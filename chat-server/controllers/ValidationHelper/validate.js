import isString from "./DataChecks/isString.js";
import isArray from "./DataChecks/isArray.js";
import isEnum from "./DataChecks/isEnum.js.js";
import getError from "./getError.js";
import validationTypes from "./validationTypes.js";

/* Method that will validate the req.body with checks provided to the function */
const validate = ({ payload, checks }) => {
  const errors = {};

  // Make sure the user provded both payload and checks
  if (!payload) {
    return getError({ message: "payload required in validateUserReqBody()" });
  }
  if (!checks) {
    return getError({ message: "checks required in validateUserReqBody()" });
  }

  Object.keys(checks).forEach((checkKey) => {
    const { type, options = {} } = checks[checkKey];
    const value = payload[checkKey];

    switch (type) {
      case validationTypes.string: {
        const { confirm, message } = isString({ value, options });
        if (!confirm) {
          errors[checkKey] = message;
        }
        break;
      }
      case validationTypes.enum: {
        const { confirm, message } = isEnum({ value, options });
        if (!confirm) {
          errors[checkKey] = message;
        }
        break;
      }
      case validationTypes.array: {
        const { confirm, message } = isArray({ value, options });
        if (!confirm) {
          errors[checkKey] = message;
        }
        break;
      }
      default: {
        errors[checkKey] = `Unknown type passed in type: ${type} `;
      }
    }
  });

  return getError({ success: Object.values(errors).length === 0, errors });
};

export default validate;
