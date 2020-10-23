export interface FormioAuthFormConfig {
    path?: string;
    form?: string;
    component?: any;
}
export interface FormioAuthRouteConfig {
    auth?: any;
    login?: any;
    register?: any;
}
export declare class FormioAuthConfig {
    component?: any;
    delayAuth?: any;
    login?: FormioAuthFormConfig;
    register?: FormioAuthFormConfig;
    oauth?: FormioOAuthConfig;
}
export interface FormioOAuthConfig {
    type: FormioOauthType;
    options: FormioOktaConfig | FormioSamlConfig;
}
export declare enum FormioOauthType {
    okta = "okta",
    saml = "saml"
}
export interface FormioOktaConfig extends OktaConfig {
    formio?: any;
}
export interface FormioSamlConfig {
    relay: string;
}
export interface OktaConfig {
    url?: string;
    tokenManager?: OktaTokenManagerConfig;
    issuer?: string;
    clientId?: string;
    redirectUri?: string;
    postLogoutRedirectUri?: string;
    pkce?: boolean;
    authorizeUrl?: string;
    userinfoUrl?: string;
    tokenUrl?: string;
    ignoreSignature?: boolean;
    maxClockSkew?: number;
    scopes?: string[];
    httpRequestClient?: Function;
}
export interface OktaTokenManagerConfig {
    storage?: string | {
        getItem?: Function;
        setItem?: Function;
    };
    secure?: boolean;
    autoRenew?: boolean;
    expireEarlySeconds?: number;
    storageKey?: string;
}
