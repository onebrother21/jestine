"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(opts) {
        super(opts.message);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AppError);
        }
        Object.assign(this, opts);
    }
    json() {
        const { name, message, _message, code, status, errors } = this;
        return { name, message, _message, code, status, errors };
    }
}
exports.AppError = AppError;
class AppWarning extends AppError {
    constructor(opts) {
        super(opts);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AppWarning);
        }
        this.warning = true;
    }
    json() {
        const { name, message, _message, code, status, errors } = this;
        return { name, message, _message, code, status, errors };
    }
}
exports.AppWarning = AppWarning;
//# sourceMappingURL=types.js.map