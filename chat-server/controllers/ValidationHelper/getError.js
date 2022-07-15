/* Error method */
const getError = ({ success = false, message = success ? "" : "Please fix the error(s)", errors = {} }) => {
  return { success, message, errors };
};

export default getError;
