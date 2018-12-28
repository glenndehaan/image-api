const path = require("path");
const log = require("../modules/logger");

/**
 * Check's HTTP response status
 *
 * @param response
 * @param src
 * @return {{ok}|Object}
 */
const checkStatus = (response, src) => {
    if (!response.ok) {
        log.error(`[HTTP FETCH] Error on ${src}, ${response.status} - ${response.statusText}`);
    }

    return response;
};

/**
 * Splits the file data
 *
 * @param _path
 * @param buffer
 * @return {{buffer: *, name: (*|string), extension: string | void | *}}
 */
const getFileData = (_path, buffer) => {
    return {
        buffer,
        name: path.basename(_path).split('.')[0],
        extension: path.extname(_path).replace('.', ''),
    };
};

/**
 * Converts the Buffer to a base64 string
 *
 * @param buffer
 * @param extension
 * @param rest
 * @return {{extension: *, base64String: string}}
 */
const toBase64 = ({ buffer, extension, ...rest }) => {
    const b64encoded = Buffer.from(buffer, 'binary').toString('base64');

    const extensionMap = {
        jpg: 'jpeg',
        png: 'png',
        gif: 'gif',
    };

    let mimetype = `image/${typeof extensionMap[extension] !== 'undefined' ? extensionMap[extension] : 'jpeg'}`;

    return {
        ...rest,
        extension,
        base64String: 'data:' + mimetype + ';base64,' + b64encoded,
    };
};

module.exports = {checkStatus, getFileData, toBase64};
