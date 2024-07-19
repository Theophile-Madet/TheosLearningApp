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

import type { ProviderAccount } from './ProviderAccount';
import { ProviderAccountFromJSON, ProviderAccountToJSON } from './ProviderAccount';
import type { StatusOK } from './StatusOK';
import { StatusOKFromJSON, StatusOKToJSON } from './StatusOK';

/**
 *
 * @export
 * @interface AllauthClientV1AccountProvidersGet200Response
 */
export interface AllauthClientV1AccountProvidersGet200Response {
	/**
	 *
	 * @type {StatusOK}
	 * @memberof AllauthClientV1AccountProvidersGet200Response
	 */
	status: StatusOK;
	/**
	 *
	 * @type {Array<ProviderAccount>}
	 * @memberof AllauthClientV1AccountProvidersGet200Response
	 */
	data: Array<ProviderAccount>;
}

/**
 * Check if a given object implements the AllauthClientV1AccountProvidersGet200Response interface.
 */
export function instanceOfAllauthClientV1AccountProvidersGet200Response(value: object): value is AllauthClientV1AccountProvidersGet200Response {
	if (!('status' in value) || value['status'] === undefined) return false;
	if (!('data' in value) || value['data'] === undefined) return false;
	return true;
}

export function AllauthClientV1AccountProvidersGet200ResponseFromJSON(json: any): AllauthClientV1AccountProvidersGet200Response {
	return AllauthClientV1AccountProvidersGet200ResponseFromJSONTyped(json, false);
}

export function AllauthClientV1AccountProvidersGet200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): AllauthClientV1AccountProvidersGet200Response {
	if (json == null) {
		return json;
	}
	return {

		'status': StatusOKFromJSON(json['status']),
		'data': ((json['data'] as Array<any>).map(ProviderAccountFromJSON))
	};
}

export function AllauthClientV1AccountProvidersGet200ResponseToJSON(value?: AllauthClientV1AccountProvidersGet200Response | null): any {
	if (value == null) {
		return value;
	}
	return {

		'status': StatusOKToJSON(value['status']),
		'data': ((value['data'] as Array<any>).map(ProviderAccountToJSON))
	};
}

