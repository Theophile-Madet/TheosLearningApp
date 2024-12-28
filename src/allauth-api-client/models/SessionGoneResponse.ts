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
import type { AuthenticationMeta } from './AuthenticationMeta';
import {
	AuthenticationMetaFromJSON,
	AuthenticationMetaFromJSONTyped,
	AuthenticationMetaToJSON
} from './AuthenticationMeta';

/**
 * The session is expired or invalid.
 * 
 * @export
 * @interface SessionGoneResponse
 */
export interface SessionGoneResponse {
	/**
	 *
	 * @type {number}
	 * @memberof SessionGoneResponse
	 */
	status: SessionGoneResponseStatusEnum;
	/**
	 *
	 * @type {object}
	 * @memberof SessionGoneResponse
	 */
	data: object;
	/**
	 *
	 * @type {AuthenticationMeta}
	 * @memberof SessionGoneResponse
	 */
	meta: AuthenticationMeta;
}


/**
 * @export
 */
export const SessionGoneResponseStatusEnum = {
	NUMBER_410: 410
} as const;
export type SessionGoneResponseStatusEnum = typeof SessionGoneResponseStatusEnum[keyof typeof SessionGoneResponseStatusEnum];


/**
 * Check if a given object implements the SessionGoneResponse interface.
 */
export function instanceOfSessionGoneResponse(value: object): value is SessionGoneResponse {
	if (!('status' in value) || value['status'] === undefined) return false;
	if (!('data' in value) || value['data'] === undefined) return false;
	if (!('meta' in value) || value['meta'] === undefined) return false;
	return true;
}

export function SessionGoneResponseFromJSON(json: any): SessionGoneResponse {
	return SessionGoneResponseFromJSONTyped(json, false);
}

export function SessionGoneResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): SessionGoneResponse {
	if (json == null) {
		return json;
	}
	return {

		'status': json['status'],
		'data': json['data'],
		'meta': AuthenticationMetaFromJSON(json['meta'])
	};
}

export function SessionGoneResponseToJSON(value?: SessionGoneResponse | null): any {
	if (value == null) {
		return value;
	}
	return {

		'status': value['status'],
		'data': value['data'],
		'meta': AuthenticationMetaToJSON(value['meta'])
	};
}

