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
import type { Authenticated } from './Authenticated';
import {
	AuthenticatedFromJSON,
	AuthenticatedFromJSONTyped,
	AuthenticatedToJSON
} from './Authenticated';
import type { AuthenticationMeta } from './AuthenticationMeta';
import {
	AuthenticationMetaFromJSON,
	AuthenticationMetaFromJSONTyped,
	AuthenticationMetaToJSON
} from './AuthenticationMeta';
import type { StatusOK } from './StatusOK';
import {
	StatusOKFromJSON,
	StatusOKFromJSONTyped,
	StatusOKToJSON
} from './StatusOK';

/**
 * 
 * @export
 * @interface AuthenticatedResponse
 */
export interface AuthenticatedResponse {
	/**
	 *
	 * @type {StatusOK}
	 * @memberof AuthenticatedResponse
	 */
	status: StatusOK;
	/**
	 *
	 * @type {Authenticated}
	 * @memberof AuthenticatedResponse
	 */
	data: Authenticated;
	/**
	 *
	 * @type {AuthenticationMeta}
	 * @memberof AuthenticatedResponse
	 */
	meta: AuthenticationMeta;
}

/**
 * Check if a given object implements the AuthenticatedResponse interface.
 */
export function instanceOfAuthenticatedResponse(value: object): value is AuthenticatedResponse {
	if (!('status' in value) || value['status'] === undefined) return false;
	if (!('data' in value) || value['data'] === undefined) return false;
	if (!('meta' in value) || value['meta'] === undefined) return false;
	return true;
}

export function AuthenticatedResponseFromJSON(json: any): AuthenticatedResponse {
	return AuthenticatedResponseFromJSONTyped(json, false);
}

export function AuthenticatedResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): AuthenticatedResponse {
	if (json == null) {
		return json;
	}
	return {

		'status': StatusOKFromJSON(json['status']),
		'data': AuthenticatedFromJSON(json['data']),
		'meta': AuthenticationMetaFromJSON(json['meta'])
	};
}

export function AuthenticatedResponseToJSON(value?: AuthenticatedResponse | null): any {
	if (value == null) {
		return value;
	}
	return {

		'status': StatusOKToJSON(value['status']),
		'data': AuthenticatedToJSON(value['data']),
		'meta': AuthenticationMetaToJSON(value['meta'])
	};
}

