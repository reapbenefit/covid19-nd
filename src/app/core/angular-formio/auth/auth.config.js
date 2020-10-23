/**
 * @fileoverview added by tsickle
 * Generated from: auth/auth.config.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
/**
 * @record
 */
export function FormioAuthFormConfig() { }
if (false) {
    /** @type {?|undefined} */
    FormioAuthFormConfig.prototype.path;
    /** @type {?|undefined} */
    FormioAuthFormConfig.prototype.form;
    /** @type {?|undefined} */
    FormioAuthFormConfig.prototype.component;
}
/**
 * @record
 */
export function FormioAuthRouteConfig() { }
if (false) {
    /** @type {?|undefined} */
    FormioAuthRouteConfig.prototype.auth;
    /** @type {?|undefined} */
    FormioAuthRouteConfig.prototype.login;
    /** @type {?|undefined} */
    FormioAuthRouteConfig.prototype.register;
}
var FormioAuthConfig = /** @class */ (function () {
    function FormioAuthConfig() {
    }
    FormioAuthConfig.decorators = [
        { type: Injectable },
    ];
    return FormioAuthConfig;
}());
export { FormioAuthConfig };
if (false) {
    /** @type {?} */
    FormioAuthConfig.prototype.component;
    /** @type {?} */
    FormioAuthConfig.prototype.delayAuth;
    /** @type {?} */
    FormioAuthConfig.prototype.login;
    /** @type {?} */
    FormioAuthConfig.prototype.register;
    /** @type {?} */
    FormioAuthConfig.prototype.oauth;
}
/**
 * @record
 */
export function FormioOAuthConfig() { }
if (false) {
    /** @type {?} */
    FormioOAuthConfig.prototype.type;
    /** @type {?} */
    FormioOAuthConfig.prototype.options;
}
/** @enum {string} */
var FormioOauthType = {
    okta: "okta",
    saml: "saml",
};
export { FormioOauthType };
/**
 * @record
 */
export function FormioOktaConfig() { }
if (false) {
    /** @type {?|undefined} */
    FormioOktaConfig.prototype.formio;
}
/**
 * @record
 */
export function FormioSamlConfig() { }
if (false) {
    /** @type {?} */
    FormioSamlConfig.prototype.relay;
}
/**
 * @record
 */
export function OktaConfig() { }
if (false) {
    /** @type {?|undefined} */
    OktaConfig.prototype.url;
    /** @type {?|undefined} */
    OktaConfig.prototype.tokenManager;
    /** @type {?|undefined} */
    OktaConfig.prototype.issuer;
    /** @type {?|undefined} */
    OktaConfig.prototype.clientId;
    /** @type {?|undefined} */
    OktaConfig.prototype.redirectUri;
    /** @type {?|undefined} */
    OktaConfig.prototype.postLogoutRedirectUri;
    /** @type {?|undefined} */
    OktaConfig.prototype.pkce;
    /** @type {?|undefined} */
    OktaConfig.prototype.authorizeUrl;
    /** @type {?|undefined} */
    OktaConfig.prototype.userinfoUrl;
    /** @type {?|undefined} */
    OktaConfig.prototype.tokenUrl;
    /** @type {?|undefined} */
    OktaConfig.prototype.ignoreSignature;
    /** @type {?|undefined} */
    OktaConfig.prototype.maxClockSkew;
    /** @type {?|undefined} */
    OktaConfig.prototype.scopes;
    /** @type {?|undefined} */
    OktaConfig.prototype.httpRequestClient;
}
/**
 * @record
 */
export function OktaTokenManagerConfig() { }
if (false) {
    /** @type {?|undefined} */
    OktaTokenManagerConfig.prototype.storage;
    /** @type {?|undefined} */
    OktaTokenManagerConfig.prototype.secure;
    /** @type {?|undefined} */
    OktaTokenManagerConfig.prototype.autoRenew;
    /** @type {?|undefined} */
    OktaTokenManagerConfig.prototype.expireEarlySeconds;
    /** @type {?|undefined} */
    OktaTokenManagerConfig.prototype.storageKey;
}
