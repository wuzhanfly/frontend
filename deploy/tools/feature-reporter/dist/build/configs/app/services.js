"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
exports.default = Object.freeze({
    reCaptchaV2: {
        siteKey: (0, utils_1.getEnvValue)('NEXT_PUBLIC_RE_CAPTCHA_APP_SITE_KEY'),
    },
});
