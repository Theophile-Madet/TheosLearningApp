/* tslint:disable */
/* eslint-disable */
/**
 * django-allauth: Headless API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1
 * Contact: info@allauth.org
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
    AllauthClientV1AccountAuthenticatorsGet200Response,
    AllauthClientV1AccountAuthenticatorsRecoveryCodesGet200Response,
    AllauthClientV1AccountAuthenticatorsTotpGet200Response,
    AllauthClientV1AccountAuthenticatorsTotpPostRequest,
    AllauthClientV1AuthPasswordRequestPost200Response
} from '../models/index';
import {
    AllauthClientV1AccountAuthenticatorsGet200ResponseFromJSON,
    AllauthClientV1AccountAuthenticatorsRecoveryCodesGet200ResponseFromJSON,
    AllauthClientV1AccountAuthenticatorsTotpGet200ResponseFromJSON,
    AllauthClientV1AccountAuthenticatorsTotpPostRequestToJSON,
    AllauthClientV1AuthPasswordRequestPost200ResponseFromJSON
} from '../models/index';

export interface AllauthClientV1AccountAuthenticatorsGetRequest {
	client: AllauthClientV1AccountAuthenticatorsGetClientEnum;
	xSessionToken?: string;
}

export interface AllauthClientV1AccountAuthenticatorsRecoveryCodesGetRequest {
	client: AllauthClientV1AccountAuthenticatorsRecoveryCodesGetClientEnum;
	xSessionToken?: string;
}

export interface AllauthClientV1AccountAuthenticatorsRecoveryCodesPostRequest {
	client: AllauthClientV1AccountAuthenticatorsRecoveryCodesPostClientEnum;
	xSessionToken?: string;
}

export interface AllauthClientV1AccountAuthenticatorsTotpDeleteRequest {
	client: AllauthClientV1AccountAuthenticatorsTotpDeleteClientEnum;
	xSessionToken?: string;
}

export interface AllauthClientV1AccountAuthenticatorsTotpGetRequest {
	client: AllauthClientV1AccountAuthenticatorsTotpGetClientEnum;
	xSessionToken?: string;
}

export interface AllauthClientV1AccountAuthenticatorsTotpPostOperationRequest {
	client: AllauthClientV1AccountAuthenticatorsTotpPostClientEnum;
	xSessionToken?: string;
	allauthClientV1AccountAuthenticatorsTotpPostRequest?: AllauthClientV1AccountAuthenticatorsTotpPostRequest;
}

/**
 *
 */
export class Account2FAApi extends runtime.BaseAPI {

	/**
	 * List authenticators
	 */
	async allauthClientV1AccountAuthenticatorsGetRaw(requestParameters: AllauthClientV1AccountAuthenticatorsGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AllauthClientV1AccountAuthenticatorsGet200Response>> {
		if (requestParameters['client'] == null) {
			throw new runtime.RequiredError(
				'client',
				'Required parameter "client" was null or undefined when calling allauthClientV1AccountAuthenticatorsGet().'
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		if (requestParameters['xSessionToken'] != null) {
			headerParameters['X-Session-Token'] = String(requestParameters['xSessionToken']);
		}

		const response = await this.request({
			path: `/_allauth/{client}/v1/account/authenticators`.replace(`{${'client'}}`, encodeURIComponent(String(requestParameters['client']))),
			method: 'GET',
			headers: headerParameters,
			query: queryParameters
		}, initOverrides);

		return new runtime.JSONApiResponse(response, (jsonValue) => AllauthClientV1AccountAuthenticatorsGet200ResponseFromJSON(jsonValue));
	}

	/**
	 * List authenticators
	 */
	async allauthClientV1AccountAuthenticatorsGet(requestParameters: AllauthClientV1AccountAuthenticatorsGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AllauthClientV1AccountAuthenticatorsGet200Response> {
		const response = await this.allauthClientV1AccountAuthenticatorsGetRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 * List recovery codes.
	 * List recovery codes
	 */
	async allauthClientV1AccountAuthenticatorsRecoveryCodesGetRaw(requestParameters: AllauthClientV1AccountAuthenticatorsRecoveryCodesGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AllauthClientV1AccountAuthenticatorsRecoveryCodesGet200Response>> {
		if (requestParameters['client'] == null) {
			throw new runtime.RequiredError(
				'client',
				'Required parameter "client" was null or undefined when calling allauthClientV1AccountAuthenticatorsRecoveryCodesGet().'
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		if (requestParameters['xSessionToken'] != null) {
			headerParameters['X-Session-Token'] = String(requestParameters['xSessionToken']);
		}

		const response = await this.request({
			path: `/_allauth/{client}/v1/account/authenticators/recovery_codes`.replace(`{${'client'}}`, encodeURIComponent(String(requestParameters['client']))),
			method: 'GET',
			headers: headerParameters,
			query: queryParameters
		}, initOverrides);

		return new runtime.JSONApiResponse(response, (jsonValue) => AllauthClientV1AccountAuthenticatorsRecoveryCodesGet200ResponseFromJSON(jsonValue));
	}

	/**
	 * List recovery codes.
	 * List recovery codes
	 */
	async allauthClientV1AccountAuthenticatorsRecoveryCodesGet(requestParameters: AllauthClientV1AccountAuthenticatorsRecoveryCodesGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AllauthClientV1AccountAuthenticatorsRecoveryCodesGet200Response> {
		const response = await this.allauthClientV1AccountAuthenticatorsRecoveryCodesGetRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 * Regenerate recovery codes
	 */
	async allauthClientV1AccountAuthenticatorsRecoveryCodesPostRaw(requestParameters: AllauthClientV1AccountAuthenticatorsRecoveryCodesPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
		if (requestParameters['client'] == null) {
			throw new runtime.RequiredError(
				'client',
				'Required parameter "client" was null or undefined when calling allauthClientV1AccountAuthenticatorsRecoveryCodesPost().'
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		if (requestParameters['xSessionToken'] != null) {
			headerParameters['X-Session-Token'] = String(requestParameters['xSessionToken']);
		}

		const response = await this.request({
			path: `/_allauth/{client}/v1/account/authenticators/recovery_codes`.replace(`{${'client'}}`, encodeURIComponent(String(requestParameters['client']))),
			method: 'POST',
			headers: headerParameters,
			query: queryParameters
		}, initOverrides);

		return new runtime.VoidApiResponse(response);
	}

	/**
	 * Regenerate recovery codes
	 */
	async allauthClientV1AccountAuthenticatorsRecoveryCodesPost(requestParameters: AllauthClientV1AccountAuthenticatorsRecoveryCodesPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
		await this.allauthClientV1AccountAuthenticatorsRecoveryCodesPostRaw(requestParameters, initOverrides);
	}

	/**
	 * Deactivates TOTP authentication. If the user authentication is not sufficiently recent, a reauthentication flow (`401`) will is presented.
	 * Deactivate TOTP
	 */
	async allauthClientV1AccountAuthenticatorsTotpDeleteRaw(requestParameters: AllauthClientV1AccountAuthenticatorsTotpDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AllauthClientV1AuthPasswordRequestPost200Response>> {
		if (requestParameters['client'] == null) {
			throw new runtime.RequiredError(
				'client',
				'Required parameter "client" was null or undefined when calling allauthClientV1AccountAuthenticatorsTotpDelete().'
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		if (requestParameters['xSessionToken'] != null) {
			headerParameters['X-Session-Token'] = String(requestParameters['xSessionToken']);
		}

		const response = await this.request({
			path: `/_allauth/{client}/v1/account/authenticators/totp`.replace(`{${'client'}}`, encodeURIComponent(String(requestParameters['client']))),
			method: 'DELETE',
			headers: headerParameters,
			query: queryParameters
		}, initOverrides);

		return new runtime.JSONApiResponse(response, (jsonValue) => AllauthClientV1AuthPasswordRequestPost200ResponseFromJSON(jsonValue));
	}

	/**
	 * Deactivates TOTP authentication. If the user authentication is not sufficiently recent, a reauthentication flow (`401`) will is presented.
	 * Deactivate TOTP
	 */
	async allauthClientV1AccountAuthenticatorsTotpDelete(requestParameters: AllauthClientV1AccountAuthenticatorsTotpDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AllauthClientV1AuthPasswordRequestPost200Response> {
		const response = await this.allauthClientV1AccountAuthenticatorsTotpDeleteRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 * Retrieve the information about the current TOTP authenticator, if any.
	 * TOTP authenticator status
	 */
	async allauthClientV1AccountAuthenticatorsTotpGetRaw(requestParameters: AllauthClientV1AccountAuthenticatorsTotpGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AllauthClientV1AccountAuthenticatorsTotpGet200Response>> {
		if (requestParameters['client'] == null) {
			throw new runtime.RequiredError(
				'client',
				'Required parameter "client" was null or undefined when calling allauthClientV1AccountAuthenticatorsTotpGet().'
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		if (requestParameters['xSessionToken'] != null) {
			headerParameters['X-Session-Token'] = String(requestParameters['xSessionToken']);
		}

		const response = await this.request({
			path: `/_allauth/{client}/v1/account/authenticators/totp`.replace(`{${'client'}}`, encodeURIComponent(String(requestParameters['client']))),
			method: 'GET',
			headers: headerParameters,
			query: queryParameters
		}, initOverrides);

		return new runtime.JSONApiResponse(response, (jsonValue) => AllauthClientV1AccountAuthenticatorsTotpGet200ResponseFromJSON(jsonValue));
	}

	/**
	 * Retrieve the information about the current TOTP authenticator, if any.
	 * TOTP authenticator status
	 */
	async allauthClientV1AccountAuthenticatorsTotpGet(requestParameters: AllauthClientV1AccountAuthenticatorsTotpGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AllauthClientV1AccountAuthenticatorsTotpGet200Response> {
		const response = await this.allauthClientV1AccountAuthenticatorsTotpGetRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 * The code should be provided from the consuming TOTP authenticator application which was generated using the TOTP authenticator secret retrieved from the TOTP authenticator status endpoint.
	 * Activate TOTP
	 */
	async allauthClientV1AccountAuthenticatorsTotpPostRaw(requestParameters: AllauthClientV1AccountAuthenticatorsTotpPostOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AllauthClientV1AccountAuthenticatorsTotpGet200Response>> {
		if (requestParameters['client'] == null) {
			throw new runtime.RequiredError(
				'client',
				'Required parameter "client" was null or undefined when calling allauthClientV1AccountAuthenticatorsTotpPost().'
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		headerParameters['Content-Type'] = 'application/json';

		if (requestParameters['xSessionToken'] != null) {
			headerParameters['X-Session-Token'] = String(requestParameters['xSessionToken']);
		}

		const response = await this.request({
			path: `/_allauth/{client}/v1/account/authenticators/totp`.replace(`{${'client'}}`, encodeURIComponent(String(requestParameters['client']))),
			method: 'POST',
			headers: headerParameters,
			query: queryParameters,
			body: AllauthClientV1AccountAuthenticatorsTotpPostRequestToJSON(requestParameters['allauthClientV1AccountAuthenticatorsTotpPostRequest'])
		}, initOverrides);

		return new runtime.JSONApiResponse(response, (jsonValue) => AllauthClientV1AccountAuthenticatorsTotpGet200ResponseFromJSON(jsonValue));
	}

	/**
	 * The code should be provided from the consuming TOTP authenticator application which was generated using the TOTP authenticator secret retrieved from the TOTP authenticator status endpoint.
	 * Activate TOTP
	 */
	async allauthClientV1AccountAuthenticatorsTotpPost(requestParameters: AllauthClientV1AccountAuthenticatorsTotpPostOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AllauthClientV1AccountAuthenticatorsTotpGet200Response> {
		const response = await this.allauthClientV1AccountAuthenticatorsTotpPostRaw(requestParameters, initOverrides);
		return await response.value();
	}

}

/**
 * @export
 */
export const AllauthClientV1AccountAuthenticatorsGetClientEnum = {
	App: 'app',
	Browser: 'browser'
} as const;
export type AllauthClientV1AccountAuthenticatorsGetClientEnum = typeof AllauthClientV1AccountAuthenticatorsGetClientEnum[keyof typeof AllauthClientV1AccountAuthenticatorsGetClientEnum];
/**
 * @export
 */
export const AllauthClientV1AccountAuthenticatorsRecoveryCodesGetClientEnum = {
	App: 'app',
	Browser: 'browser'
} as const;
export type AllauthClientV1AccountAuthenticatorsRecoveryCodesGetClientEnum = typeof AllauthClientV1AccountAuthenticatorsRecoveryCodesGetClientEnum[keyof typeof AllauthClientV1AccountAuthenticatorsRecoveryCodesGetClientEnum];
/**
 * @export
 */
export const AllauthClientV1AccountAuthenticatorsRecoveryCodesPostClientEnum = {
	App: 'app',
	Browser: 'browser'
} as const;
export type AllauthClientV1AccountAuthenticatorsRecoveryCodesPostClientEnum = typeof AllauthClientV1AccountAuthenticatorsRecoveryCodesPostClientEnum[keyof typeof AllauthClientV1AccountAuthenticatorsRecoveryCodesPostClientEnum];
/**
 * @export
 */
export const AllauthClientV1AccountAuthenticatorsTotpDeleteClientEnum = {
	App: 'app',
	Browser: 'browser'
} as const;
export type AllauthClientV1AccountAuthenticatorsTotpDeleteClientEnum = typeof AllauthClientV1AccountAuthenticatorsTotpDeleteClientEnum[keyof typeof AllauthClientV1AccountAuthenticatorsTotpDeleteClientEnum];
/**
 * @export
 */
export const AllauthClientV1AccountAuthenticatorsTotpGetClientEnum = {
	App: 'app',
	Browser: 'browser'
} as const;
export type AllauthClientV1AccountAuthenticatorsTotpGetClientEnum = typeof AllauthClientV1AccountAuthenticatorsTotpGetClientEnum[keyof typeof AllauthClientV1AccountAuthenticatorsTotpGetClientEnum];
/**
 * @export
 */
export const AllauthClientV1AccountAuthenticatorsTotpPostOperationClientEnum = {
	App: 'app',
	Browser: 'browser'
} as const;
export type AllauthClientV1AccountAuthenticatorsTotpPostOperationClientEnum = typeof AllauthClientV1AccountAuthenticatorsTotpPostOperationClientEnum[keyof typeof AllauthClientV1AccountAuthenticatorsTotpPostOperationClientEnum];
