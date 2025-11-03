"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailValidator = exports.EMAIL_REGEXP = void 0;
exports.EMAIL_REGEXP = /^[\w.%+-]+@[a-z\d-]+(?:\.[a-z\d-]+)+$/i;
const emailValidator = (value) => exports.EMAIL_REGEXP.test(value) ? true : 'Invalid email';
exports.emailValidator = emailValidator;
