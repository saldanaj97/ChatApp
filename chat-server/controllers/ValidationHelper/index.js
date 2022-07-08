import validate from "./validate.js";

export default function validateUserReqBody(cb) {
  const validationTypes = {
    string: "string",
    enum: "enum",
    array: "array",
  };
  const result = cb(validationTypes);
  const { payload, checks } = result || {};
  return validate({ payload, checks });
}
