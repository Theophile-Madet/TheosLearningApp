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
import type { AuthenticatorType } from './AuthenticatorType';
import {
	AuthenticatorTypeFromJSON,
	AuthenticatorTypeFromJSONTyped,
	AuthenticatorTypeToJSON
} from './AuthenticatorType';

/**
 * 
 * @export
 * @interface ReAuthenticatedBy2FA
 */
export interface ReAuthenticatedBy2FA {
	/**
	 *
	 * @type {string}
	 * @memberof ReAuthenticatedBy2FA
	 */
	method: ReAuthenticatedBy2FAMethodEnum;
	/**
	 * An epoch based timestamp (trivial to parse using: `new Date(value)*1000`)
	 *
	 * @type {number}
	 * @memberof ReAuthenticatedBy2FA
	 */
	at: number;
	/**
	 *
	 * @type {AuthenticatorType}
	 * @memberof ReAuthenticatedBy2FA
	 */
	type: AuthenticatorType;
	/**
	 *
	 * @type {boolean}
	 * @memberof ReAuthenticatedBy2FA
	 */
	reauthenticated?: boolean;
}


/**
 * @export
 */
export const ReAuthenticatedBy2FAMethodEnum = {
	Mfa: 'mfa'
} as const;
export type ReAuthenticatedBy2FAMethodEnum = typeof ReAuthenticatedBy2FAMethodEnum[keyof typeof ReAuthenticatedBy2FAMethodEnum];


/**
 * Check if a given object implements the ReAuthenticatedBy2FA interface.
 */
export function instanceOfReAuthenticatedBy2FA(value: object): value is ReAuthenticatedBy2FA {
	if (!('method' in value) || value['method'] === undefined) return false;
	if (!('at' in value) || value['at'] === undefined) return false;
	if (!('type' in value) || value['type'] === undefined) return false;
	return true;
}

export function ReAuthenticatedBy2FAFromJSON(json: any): ReAuthenticatedBy2FA {
	return ReAuthenticatedBy2FAFromJSONTyped(json, false);
}

export function ReAuthenticatedBy2FAFromJSONTyped(json: any, ignoreDiscriminator: boolean): ReAuthenticatedBy2FA {
	if (json == null) {
		return json;
	}
	return {

		'method': json['method'],
		'at': json['at'],
		'type': AuthenticatorTypeFromJSON(json['type']),
		'reauthenticated': json['reauthenticated'] == null ? undefined : json['reauthenticated']
	};
}

export function ReAuthenticatedBy2FAToJSON(value?: ReAuthenticatedBy2FA | null): any {
	if (value == null) {
		return value;
	}
	return {

		'method': value['method'],
		'at': value['at'],
		'type': AuthenticatorTypeToJSON(value['type']),
		'reauthenticated': value['reauthenticated']
	};
}

