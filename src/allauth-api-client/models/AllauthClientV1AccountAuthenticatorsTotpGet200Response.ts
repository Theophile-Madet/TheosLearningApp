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

import { mapValues } from '../runtime';
import type { TOTPAuthenticator } from './TOTPAuthenticator';
import {
	TOTPAuthenticatorFromJSON,
	TOTPAuthenticatorFromJSONTyped,
	TOTPAuthenticatorToJSON
} from './TOTPAuthenticator';
import type { StatusOK } from './StatusOK';
import {
	StatusOKFromJSON,
	StatusOKFromJSONTyped,
	StatusOKToJSON
} from './StatusOK';

/**
 * 
 * @export
 * @interface AllauthClientV1AccountAuthenticatorsTotpGet200Response
 */
export interface AllauthClientV1AccountAuthenticatorsTotpGet200Response {
	/**
	 *
	 * @type {StatusOK}
	 * @memberof AllauthClientV1AccountAuthenticatorsTotpGet200Response
	 */
	status: StatusOK;
	/**
	 *
	 * @type {TOTPAuthenticator}
	 * @memberof AllauthClientV1AccountAuthenticatorsTotpGet200Response
	 */
	data: TOTPAuthenticator;
}

/**
 * Check if a given object implements the AllauthClientV1AccountAuthenticatorsTotpGet200Response interface.
 */
export function instanceOfAllauthClientV1AccountAuthenticatorsTotpGet200Response(value: object): value is AllauthClientV1AccountAuthenticatorsTotpGet200Response {
	if (!('status' in value) || value['status'] === undefined) return false;
	if (!('data' in value) || value['data'] === undefined) return false;
	return true;
}

export function AllauthClientV1AccountAuthenticatorsTotpGet200ResponseFromJSON(json: any): AllauthClientV1AccountAuthenticatorsTotpGet200Response {
	return AllauthClientV1AccountAuthenticatorsTotpGet200ResponseFromJSONTyped(json, false);
}

export function AllauthClientV1AccountAuthenticatorsTotpGet200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): AllauthClientV1AccountAuthenticatorsTotpGet200Response {
	if (json == null) {
		return json;
	}
	return {

		'status': StatusOKFromJSON(json['status']),
		'data': TOTPAuthenticatorFromJSON(json['data'])
	};
}

export function AllauthClientV1AccountAuthenticatorsTotpGet200ResponseToJSON(value?: AllauthClientV1AccountAuthenticatorsTotpGet200Response | null): any {
	if (value == null) {
		return value;
	}
	return {

		'status': StatusOKToJSON(value['status']),
		'data': TOTPAuthenticatorToJSON(value['data'])
	};
}

