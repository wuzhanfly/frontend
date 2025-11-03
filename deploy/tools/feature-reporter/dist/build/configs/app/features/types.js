"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeaturePayload = void 0;
// typescript cannot properly resolve unions in nested objects - https://github.com/microsoft/TypeScript/issues/18758
// so we use this little helper where it is needed
const getFeaturePayload = (feature) => {
    return feature.isEnabled ? feature : undefined;
};
exports.getFeaturePayload = getFeaturePayload;
