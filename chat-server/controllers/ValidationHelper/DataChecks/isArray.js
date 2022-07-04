import isString from './isString.js'
import checkResponse from './checkResponse.js'

const defaultOptions = {
    unique: false,
    stringOnly: false,
    empty: true
}

const isArray = ({ value: array, options = defaultOptions }) => {

    if (!Array.isArray(array)) {
        return checkResponse(false, 'Please provide an array')
    }

    if (options.unique) {
        const unique = new Set(array).size === array.length;
        if (!unique) {
            return checkResponse(false, 'Values of array should be unique')
        }
    }

    if (options.stringOnly) {
        const allString = array.every((item) => isString({ value: item }).confirm)
        if (!allString) {
            return checkResponse(false, 'Please make sure values of array are all strings')
        }
    }
}

export default isArray