import checkResponse from './checkResponse.js'

const defaultOptions = {
    empty: false,
}

const isString = ({ value, options = defaultOptions }) => {
    if (typeof value !== 'string') {
        return checkResponse(false, 'Please provide a string')
    }

    if (!options.empty && value.trim().length === 0) {
        return checkResponse(false, 'String cannot be empty')
    }

    return checkResponse(true);
}

export default isString;