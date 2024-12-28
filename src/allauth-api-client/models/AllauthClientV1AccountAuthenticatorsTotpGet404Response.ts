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
import type {
	AllauthClientV1AccountAuthenticatorsTotpGet404ResponseMeta
} from './AllauthClientV1AccountAuthenticatorsTotpGet404ResponseMeta';
import {
	AllauthClientV1AccountAuthenticatorsTotpGet404ResponseMetaFromJSON,
	AllauthClientV1AccountAuthenticatorsTotpGet404ResponseMetaFromJSONTyped,
	AllauthClientV1AccountAuthenticatorsTotpGet404ResponseMetaToJSON
} from './AllauthClientV1AccountAuthenticatorsTotpGet404ResponseMeta';

/**
 * 
 * @export
 * @interface AllauthClientV1AccountAuthenticatorsTotpGet404Response
 */
export interface AllauthClientV1AccountAuthenticatorsTotpGet404Response {
	/**
	 *
	 * @type {number}
	 * @memberof AllauthClientV1AccountAuthenticatorsTotpGet404Response
	 */
	status: AllauthClientV1AccountAuthenticatorsTotpGet404ResponseStatusEnum;
	/**
	 *
	 * @type {AllauthClientV1AccountAuthenticatorsTotpGet404ResponseMeta}
	 * @memberof AllauthClientV1AccountAuthenticatorsTotpGet404Response
	 */
	meta: AllauthClientV1AccountAuthenticatorsTotpGet404ResponseMeta;
}


/**
 * @export
 */
export const AllauthClientV1AccountAuthenticatorsTotpGet404ResponseStatusEnum = {
	NUMBER_404: 404
} as const;
export type AllauthClientV1AccountAuthenticatorsTotpGet404ResponseStatusEnum = typeof AllauthClientV1AccountAuthenticatorsTotpGet404ResponseStatusEnum[keyof typeof AllauthClientV1AccountAuthenticatorsTotpGet404ResponseStatusEnum];


/**
 * Check if a given object implements the AllauthClientV1AccountAuthenticatorsTotpGet404Response interface.
 */
export function instanceOfAllauthClientV1AccountAuthenticatorsTotpGet404Response(value: object): value is AllauthClientV1AccountAuthenticatorsTotpGet404Response {
	if (!('status' in value) || value['status'] === undefined) return false;
	if (!('meta' in value) || value['meta'] === undefined) return false;
	return true;
}

export function AllauthClientV1AccountAuthenticatorsTotpGet404ResponseFromJSON(json: any): AllauthClientV1AccountAuthenticatorsTotpGet404Response {
	return AllauthClientV1AccountAuthenticatorsTotpGet404ResponseFromJSONTyped(json, false);
}

export function AllauthClientV1AccountAuthenticatorsTotpGet404ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): AllauthClientV1AccountAuthenticatorsTotpGet404Response {
	if (json == null) {
		return json;
	}
	return {

		'status': json['status'],
		'meta': AllauthClientV1AccountAuthenticatorsTotpGet404ResponseMetaFromJSON(json['meta'])
	};
}

export function AllauthClientV1AccountAuthenticatorsTotpGet404ResponseToJSON(value?: AllauthClientV1AccountAuthenticatorsTotpGet404Response | null): any {
	if (value == null) {
		return value;
	}
	return {

		'status': value['status'],
		'meta': AllauthClientV1AccountAuthenticatorsTotpGet404ResponseMetaToJSON(value['meta'])
	};
}

