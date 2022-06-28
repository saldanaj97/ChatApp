import validationTypes from "./ValidationHelper/validationTypes.js";
import validate from "./ValidationHelper/validate.js";

export default function validateUserReqBody(cb) {
  const result = cb(validationTypes);
  const { payload, checks } = result || {};
  return validate({ payload, checks });
}
