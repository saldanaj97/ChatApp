import isString from "./isString.js";
import checkResponse from "./checkResponse.js";

const defaultOptions = {
  enum: {},
};

const isEnum = ({ value, options = defaultOptions }) => {
  if (!options.enum) {
    return checkResponse(false, `options.enum required can be an obj or string seperated by command`);
  }

  const enumValues = isString({ value: options.enum }).confirm ? options.enum.split(" ") : Object.values(options.enum);
  const found = enumValues.some((enumItem) => enumItem === value);
  if (!found) {
    return checkResponse(false, `Possible values are ${enumValues}`);
  }
  return checkResponse(true);
};

export default isEnum;
