import validationTypes from './validationTypes.js';
import validate from './validate.js';

export default function validateUserReqBody(cb) {
    const result = cb(validationTypes)
    const { payload, checks } = result || {}
    return validate({ payload, checks })
}
