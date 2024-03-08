"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllerResponse = exports.createErrorResponse = exports.createResponse = void 0;
const createResponse = (apiResponse) => {
    const defaultResponse = {
        code: 100,
        httpStatusCode: 200,
        message: '',
        status: true,
    };
    return Object.assign(Object.assign({}, defaultResponse), apiResponse);
};
exports.createResponse = createResponse;
const createErrorResponse = (apiResponse) => {
    const defaultResponse = {
        code: 102,
        httpStatusCode: 500,
        message: '',
        status: false,
    };
    return Object.assign(Object.assign({}, defaultResponse), apiResponse);
};
exports.createErrorResponse = createErrorResponse;
const controllerResponse = (apiResponse, res) => {
    const exceptHttpStatusCodeResponse = Object.assign({}, apiResponse);
    delete exceptHttpStatusCodeResponse.httpStatusCode;
    return res
        .status(apiResponse.httpStatusCode)
        .json(exceptHttpStatusCodeResponse);
};
exports.controllerResponse = controllerResponse;
