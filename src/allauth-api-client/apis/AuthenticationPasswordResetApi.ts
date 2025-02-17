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
	AllauthClientV1AuthPasswordRequestPost200Response,
	AllauthClientV1AuthPasswordResetGet200Response,
	AuthenticatedResponse,
	AuthenticationResponse,
	ErrorResponse,
	RequestPassword,
	ResetPassword
} from '../models/index';
import {
	AllauthClientV1AuthPasswordRequestPost200ResponseFromJSON,
	AllauthClientV1AuthPasswordRequestPost200ResponseToJSON,
	AllauthClientV1AuthPasswordResetGet200ResponseFromJSON,
	AllauthClientV1AuthPasswordResetGet200ResponseToJSON,
	AuthenticatedResponseFromJSON,
	AuthenticatedResponseToJSON,
	AuthenticationResponseFromJSON,
	AuthenticationResponseToJSON,
	ErrorResponseFromJSON,
	ErrorResponseToJSON,
	RequestPasswordFromJSON,
	RequestPasswordToJSON,
	ResetPasswordFromJSON,
	ResetPasswordToJSON
} from '../models/index';

export interface AllauthClientV1AuthPasswordRequestPostRequest {
	client: AllauthClientV1AuthPasswordRequestPostClientEnum;
	requestPassword: RequestPassword;
}

export interface AllauthClientV1AuthPasswordResetGetRequest {
	client: AllauthClientV1AuthPasswordResetGetClientEnum;
	xPasswordResetKey: string;
}

export interface AllauthClientV1AuthPasswordResetPostRequest {
	client: AllauthClientV1AuthPasswordResetPostClientEnum;
	resetPassword?: ResetPassword;
}

/**
 * 
 */
export class AuthenticationPasswordResetApi extends runtime.BaseAPI {

	/**
	 * Request password
	 */
	async allauthClientV1AuthPasswordRequestPostRaw(requestParameters: AllauthClientV1AuthPasswordRequestPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AllauthClientV1AuthPasswordRequestPost200Response>> {
		if (requestParameters['client'] == null) {
			throw new runtime.RequiredError(
				'client',
				'Required parameter "client" was null or undefined when calling allauthClientV1AuthPasswordRequestPost().'
			);
		}

		if (requestParameters['requestPassword'] == null) {
			throw new runtime.RequiredError(
				'requestPassword',
				'Required parameter "requestPassword" was null or undefined when calling allauthClientV1AuthPasswordRequestPost().'
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		headerParameters['Content-Type'] = 'application/json';

		const response = await this.request({
			path: `/_allauth/{client}/v1/auth/password/request`.replace(`{${'client'}}`, encodeURIComponent(String(requestParameters['client']))),
			method: 'POST',
			headers: headerParameters,
			query: queryParameters,
			body: RequestPasswordToJSON(requestParameters['requestPassword'])
		}, initOverrides);

		return new runtime.JSONApiResponse(response, (jsonValue) => AllauthClientV1AuthPasswordRequestPost200ResponseFromJSON(jsonValue));
	}

	/**
	 * Request password
	 */
	async allauthClientV1AuthPasswordRequestPost(requestParameters: AllauthClientV1AuthPasswordRequestPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AllauthClientV1AuthPasswordRequestPost200Response> {
		const response = await this.allauthClientV1AuthPasswordRequestPostRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 * Get password reset information
	 */
	async allauthClientV1AuthPasswordResetGetRaw(requestParameters: AllauthClientV1AuthPasswordResetGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AllauthClientV1AuthPasswordResetGet200Response>> {
		if (requestParameters['client'] == null) {
			throw new runtime.RequiredError(
				'client',
				'Required parameter "client" was null or undefined when calling allauthClientV1AuthPasswordResetGet().'
			);
		}

		if (requestParameters['xPasswordResetKey'] == null) {
			throw new runtime.RequiredError(
				'xPasswordResetKey',
				'Required parameter "xPasswordResetKey" was null or undefined when calling allauthClientV1AuthPasswordResetGet().'
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		if (requestParameters['xPasswordResetKey'] != null) {
			headerParameters['X-Password-Reset-Key'] = String(requestParameters['xPasswordResetKey']);
		}

		const response = await this.request({
			path: `/_allauth/{client}/v1/auth/password/reset`.replace(`{${'client'}}`, encodeURIComponent(String(requestParameters['client']))),
			method: 'GET',
			headers: headerParameters,
			query: queryParameters
		}, initOverrides);

		return new runtime.JSONApiResponse(response, (jsonValue) => AllauthClientV1AuthPasswordResetGet200ResponseFromJSON(jsonValue));
	}

	/**
	 * Get password reset information
	 */
	async allauthClientV1AuthPasswordResetGet(requestParameters: AllauthClientV1AuthPasswordResetGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AllauthClientV1AuthPasswordResetGet200Response> {
		const response = await this.allauthClientV1AuthPasswordResetGetRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 * Reset password
	 */
	async allauthClientV1AuthPasswordResetPostRaw(requestParameters: AllauthClientV1AuthPasswordResetPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AuthenticatedResponse>> {
		if (requestParameters['client'] == null) {
			throw new runtime.RequiredError(
				'client',
				'Required parameter "client" was null or undefined when calling allauthClientV1AuthPasswordResetPost().'
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		headerParameters['Content-Type'] = 'application/json';

		const response = await this.request({
			path: `/_allauth/{client}/v1/auth/password/reset`.replace(`{${'client'}}`, encodeURIComponent(String(requestParameters['client']))),
			method: 'POST',
			headers: headerParameters,
			query: queryParameters,
			body: ResetPasswordToJSON(requestParameters['resetPassword'])
		}, initOverrides);

		return new runtime.JSONApiResponse(response, (jsonValue) => AuthenticatedResponseFromJSON(jsonValue));
	}

	/**
	 * Reset password
	 */
	async allauthClientV1AuthPasswordResetPost(requestParameters: AllauthClientV1AuthPasswordResetPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AuthenticatedResponse> {
		const response = await this.allauthClientV1AuthPasswordResetPostRaw(requestParameters, initOverrides);
		return await response.value();
	}

}

/**
 * @export
 */
export const AllauthClientV1AuthPasswordRequestPostClientEnum = {
	App: 'app',
	Browser: 'browser'
} as const;
export type AllauthClientV1AuthPasswordRequestPostClientEnum = typeof AllauthClientV1AuthPasswordRequestPostClientEnum[keyof typeof AllauthClientV1AuthPasswordRequestPostClientEnum];
/**
 * @export
 */
export const AllauthClientV1AuthPasswordResetGetClientEnum = {
	App: 'app',
	Browser: 'browser'
} as const;
export type AllauthClientV1AuthPasswordResetGetClientEnum = typeof AllauthClientV1AuthPasswordResetGetClientEnum[keyof typeof AllauthClientV1AuthPasswordResetGetClientEnum];
/**
 * @export
 */
export const AllauthClientV1AuthPasswordResetPostClientEnum = {
	App: 'app',
	Browser: 'browser'
} as const;
export type AllauthClientV1AuthPasswordResetPostClientEnum = typeof AllauthClientV1AuthPasswordResetPostClientEnum[keyof typeof AllauthClientV1AuthPasswordResetPostClientEnum];
