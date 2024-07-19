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
import type { AllauthClientV1SessionsGet200Response } from '../models/index';
import { AllauthClientV1SessionsGet200ResponseFromJSON } from '../models/index';

export interface AllauthClientV1SessionsDeleteRequest {
	client: AllauthClientV1SessionsDeleteClientEnum;
}

export interface AllauthClientV1SessionsGetRequest {
	client: AllauthClientV1SessionsGetClientEnum;
}

/**
 *
 */
export class SessionsApi extends runtime.BaseAPI {

	/**
	 * Delete a session
	 */
	async allauthClientV1SessionsDeleteRaw(requestParameters: AllauthClientV1SessionsDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AllauthClientV1SessionsGet200Response>> {
		if (requestParameters['client'] == null) {
			throw new runtime.RequiredError(
				'client',
				'Required parameter "client" was null or undefined when calling allauthClientV1SessionsDelete().'
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		const response = await this.request({
			path: `/_allauth/{client}/v1/sessions`.replace(`{${'client'}}`, encodeURIComponent(String(requestParameters['client']))),
			method: 'DELETE',
			headers: headerParameters,
			query: queryParameters
		}, initOverrides);

		return new runtime.JSONApiResponse(response, (jsonValue) => AllauthClientV1SessionsGet200ResponseFromJSON(jsonValue));
	}

	/**
	 * Delete a session
	 */
	async allauthClientV1SessionsDelete(requestParameters: AllauthClientV1SessionsDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AllauthClientV1SessionsGet200Response> {
		const response = await this.allauthClientV1SessionsDeleteRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 * List sessions
	 */
	async allauthClientV1SessionsGetRaw(requestParameters: AllauthClientV1SessionsGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AllauthClientV1SessionsGet200Response>> {
		if (requestParameters['client'] == null) {
			throw new runtime.RequiredError(
				'client',
				'Required parameter "client" was null or undefined when calling allauthClientV1SessionsGet().'
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		const response = await this.request({
			path: `/_allauth/{client}/v1/sessions`.replace(`{${'client'}}`, encodeURIComponent(String(requestParameters['client']))),
			method: 'GET',
			headers: headerParameters,
			query: queryParameters
		}, initOverrides);

		return new runtime.JSONApiResponse(response, (jsonValue) => AllauthClientV1SessionsGet200ResponseFromJSON(jsonValue));
	}

	/**
	 * List sessions
	 */
	async allauthClientV1SessionsGet(requestParameters: AllauthClientV1SessionsGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AllauthClientV1SessionsGet200Response> {
		const response = await this.allauthClientV1SessionsGetRaw(requestParameters, initOverrides);
		return await response.value();
	}

}

/**
 * @export
 */
export const AllauthClientV1SessionsDeleteClientEnum = {
	App: 'app',
	Browser: 'browser'
} as const;
export type AllauthClientV1SessionsDeleteClientEnum = typeof AllauthClientV1SessionsDeleteClientEnum[keyof typeof AllauthClientV1SessionsDeleteClientEnum];
/**
 * @export
 */
export const AllauthClientV1SessionsGetClientEnum = {
	App: 'app',
	Browser: 'browser'
} as const;
export type AllauthClientV1SessionsGetClientEnum = typeof AllauthClientV1SessionsGetClientEnum[keyof typeof AllauthClientV1SessionsGetClientEnum];
