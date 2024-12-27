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
	AuthenticatedResponse,
	AuthenticationResponse,
	ErrorResponse,
	MFAAuthenticate
} from '../models/index';
import {
	AuthenticatedResponseFromJSON,
	AuthenticatedResponseToJSON,
	AuthenticationResponseFromJSON,
	AuthenticationResponseToJSON,
	ErrorResponseFromJSON,
	ErrorResponseToJSON,
	MFAAuthenticateFromJSON,
	MFAAuthenticateToJSON
} from '../models/index';

export interface AllauthClientV1Auth2faAuthenticatePostRequest {
	client: AllauthClientV1Auth2faAuthenticatePostClientEnum;
	mFAAuthenticate: MFAAuthenticate;
	xSessionToken?: string;
}

export interface AllauthClientV1Auth2faReauthenticatePostRequest {
	client: AllauthClientV1Auth2faReauthenticatePostClientEnum;
	xSessionToken?: string;
}

/**
 *
 */
export class Authentication2FAApi extends runtime.BaseAPI {

	/**
	 * If, during authentication,  a response with status 401 is encountered where one of the pending flows has ID `mfa_authenticate`, that indicates that the Two-Factor Authentication stage needs to be completed.
	 * Two-factor authentication
	 */
	async allauthClientV1Auth2faAuthenticatePostRaw(requestParameters: AllauthClientV1Auth2faAuthenticatePostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AuthenticatedResponse>> {
		if (requestParameters['client'] == null) {
			throw new runtime.RequiredError(
				'client',
				'Required parameter "client" was null or undefined when calling allauthClientV1Auth2faAuthenticatePost().'
			);
		}

		if (requestParameters['mFAAuthenticate'] == null) {
			throw new runtime.RequiredError(
				'mFAAuthenticate',
				'Required parameter "mFAAuthenticate" was null or undefined when calling allauthClientV1Auth2faAuthenticatePost().'
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		headerParameters['Content-Type'] = 'application/json';

		if (requestParameters['xSessionToken'] != null) {
			headerParameters['X-Session-Token'] = String(requestParameters['xSessionToken']);
		}

		const response = await this.request({
			path: `/_allauth/{client}/v1/auth/2fa/authenticate`.replace(`{${'client'}}`, encodeURIComponent(String(requestParameters['client']))),
			method: 'POST',
			headers: headerParameters,
			query: queryParameters,
			body: MFAAuthenticateToJSON(requestParameters['mFAAuthenticate'])
		}, initOverrides);

		return new runtime.JSONApiResponse(response, (jsonValue) => AuthenticatedResponseFromJSON(jsonValue));
	}

	/**
	 * If, during authentication,  a response with status 401 is encountered where one of the pending flows has ID `mfa_authenticate`, that indicates that the Two-Factor Authentication stage needs to be completed.
	 * Two-factor authentication
	 */
	async allauthClientV1Auth2faAuthenticatePost(requestParameters: AllauthClientV1Auth2faAuthenticatePostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AuthenticatedResponse> {
		const response = await this.allauthClientV1Auth2faAuthenticatePostRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 * In order to safeguard the account, some actions require the user to be recently authenticated.  If you try to perform such an action without having been recently authenticated, a `401` status is returned, listing flows that can be performed to reauthenticate. One such flow is the flow with ID `mfa_reauthenticate`, which allows for the user to input an authenticator code (e.g. TOTP or recovery code). This is the endpoint related towards that flow.
	 * Reauthenticate using 2FA
	 */
	async allauthClientV1Auth2faReauthenticatePostRaw(requestParameters: AllauthClientV1Auth2faReauthenticatePostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AuthenticatedResponse>> {
		if (requestParameters['client'] == null) {
			throw new runtime.RequiredError(
				'client',
				'Required parameter "client" was null or undefined when calling allauthClientV1Auth2faReauthenticatePost().'
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		if (requestParameters['xSessionToken'] != null) {
			headerParameters['X-Session-Token'] = String(requestParameters['xSessionToken']);
		}

		const response = await this.request({
			path: `/_allauth/{client}/v1/auth/2fa/reauthenticate`.replace(`{${'client'}}`, encodeURIComponent(String(requestParameters['client']))),
			method: 'POST',
			headers: headerParameters,
			query: queryParameters
		}, initOverrides);

		return new runtime.JSONApiResponse(response, (jsonValue) => AuthenticatedResponseFromJSON(jsonValue));
	}

	/**
	 * In order to safeguard the account, some actions require the user to be recently authenticated.  If you try to perform such an action without having been recently authenticated, a `401` status is returned, listing flows that can be performed to reauthenticate. One such flow is the flow with ID `mfa_reauthenticate`, which allows for the user to input an authenticator code (e.g. TOTP or recovery code). This is the endpoint related towards that flow.
	 * Reauthenticate using 2FA
	 */
	async allauthClientV1Auth2faReauthenticatePost(requestParameters: AllauthClientV1Auth2faReauthenticatePostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AuthenticatedResponse> {
		const response = await this.allauthClientV1Auth2faReauthenticatePostRaw(requestParameters, initOverrides);
		return await response.value();
	}

}

/**
 * @export
 */
export const AllauthClientV1Auth2faAuthenticatePostClientEnum = {
	App: 'app',
	Browser: 'browser'
} as const;
export type AllauthClientV1Auth2faAuthenticatePostClientEnum = typeof AllauthClientV1Auth2faAuthenticatePostClientEnum[keyof typeof AllauthClientV1Auth2faAuthenticatePostClientEnum];
/**
 * @export
 */
export const AllauthClientV1Auth2faReauthenticatePostClientEnum = {
	App: 'app',
	Browser: 'browser'
} as const;
export type AllauthClientV1Auth2faReauthenticatePostClientEnum = typeof AllauthClientV1Auth2faReauthenticatePostClientEnum[keyof typeof AllauthClientV1Auth2faReauthenticatePostClientEnum];
