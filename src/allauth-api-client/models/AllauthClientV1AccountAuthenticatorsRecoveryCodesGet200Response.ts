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
import type { SensitiveRecoveryCodesAuthenticator } from './SensitiveRecoveryCodesAuthenticator';
import {
	SensitiveRecoveryCodesAuthenticatorFromJSON,
	SensitiveRecoveryCodesAuthenticatorFromJSONTyped,
	SensitiveRecoveryCodesAuthenticatorToJSON
} from './SensitiveRecoveryCodesAuthenticator';
import type { StatusOK } from './StatusOK';
import {
	StatusOKFromJSON,
	StatusOKFromJSONTyped,
	StatusOKToJSON
} from './StatusOK';

/**
 * 
 * @export
 * @interface AllauthClientV1AccountAuthenticatorsRecoveryCodesGet200Response
 */
export interface AllauthClientV1AccountAuthenticatorsRecoveryCodesGet200Response {
	/**
	 *
	 * @type {StatusOK}
	 * @memberof AllauthClientV1AccountAuthenticatorsRecoveryCodesGet200Response
	 */
	status: StatusOK;
	/**
	 *
	 * @type {SensitiveRecoveryCodesAuthenticator}
	 * @memberof AllauthClientV1AccountAuthenticatorsRecoveryCodesGet200Response
	 */
	data: SensitiveRecoveryCodesAuthenticator;
}

/**
 * Check if a given object implements the AllauthClientV1AccountAuthenticatorsRecoveryCodesGet200Response interface.
 */
export function instanceOfAllauthClientV1AccountAuthenticatorsRecoveryCodesGet200Response(value: object): value is AllauthClientV1AccountAuthenticatorsRecoveryCodesGet200Response {
	if (!('status' in value) || value['status'] === undefined) return false;
	if (!('data' in value) || value['data'] === undefined) return false;
	return true;
}

export function AllauthClientV1AccountAuthenticatorsRecoveryCodesGet200ResponseFromJSON(json: any): AllauthClientV1AccountAuthenticatorsRecoveryCodesGet200Response {
	return AllauthClientV1AccountAuthenticatorsRecoveryCodesGet200ResponseFromJSONTyped(json, false);
}

export function AllauthClientV1AccountAuthenticatorsRecoveryCodesGet200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): AllauthClientV1AccountAuthenticatorsRecoveryCodesGet200Response {
	if (json == null) {
		return json;
	}
	return {

		'status': StatusOKFromJSON(json['status']),
		'data': SensitiveRecoveryCodesAuthenticatorFromJSON(json['data'])
	};
}

export function AllauthClientV1AccountAuthenticatorsRecoveryCodesGet200ResponseToJSON(value?: AllauthClientV1AccountAuthenticatorsRecoveryCodesGet200Response | null): any {
	if (value == null) {
		return value;
	}
	return {

		'status': StatusOKToJSON(value['status']),
		'data': SensitiveRecoveryCodesAuthenticatorToJSON(value['data'])
	};
}

