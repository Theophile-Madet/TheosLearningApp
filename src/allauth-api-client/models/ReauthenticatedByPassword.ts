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

/**
 *
 * @export
 * @interface ReauthenticatedByPassword
 */
export interface ReauthenticatedByPassword {
	/**
	 *
	 * @type {string}
	 * @memberof ReauthenticatedByPassword
	 */
	method: ReauthenticatedByPasswordMethodEnum;
	/**
	 * An epoch based timestamp (trivial to parse using: `new Date(value)*1000`)
	 *
	 * @type {number}
	 * @memberof ReauthenticatedByPassword
	 */
	at: number;
	/**
	 *
	 * @type {boolean}
	 * @memberof ReauthenticatedByPassword
	 */
	reauthenticated: boolean;
}


/**
 * @export
 */
export const ReauthenticatedByPasswordMethodEnum = {
	Password: 'password'
} as const;
export type ReauthenticatedByPasswordMethodEnum = typeof ReauthenticatedByPasswordMethodEnum[keyof typeof ReauthenticatedByPasswordMethodEnum];


/**
 * Check if a given object implements the ReauthenticatedByPassword interface.
 */
export function instanceOfReauthenticatedByPassword(value: object): value is ReauthenticatedByPassword {
	if (!('method' in value) || value['method'] === undefined) return false;
	if (!('at' in value) || value['at'] === undefined) return false;
	if (!('reauthenticated' in value) || value['reauthenticated'] === undefined) return false;
	return true;
}

export function ReauthenticatedByPasswordFromJSON(json: any): ReauthenticatedByPassword {
	return ReauthenticatedByPasswordFromJSONTyped(json, false);
}

export function ReauthenticatedByPasswordFromJSONTyped(json: any, ignoreDiscriminator: boolean): ReauthenticatedByPassword {
	if (json == null) {
		return json;
	}
	return {

		'method': json['method'],
		'at': json['at'],
		'reauthenticated': json['reauthenticated']
	};
}

export function ReauthenticatedByPasswordToJSON(value?: ReauthenticatedByPassword | null): any {
	if (value == null) {
		return value;
	}
	return {

		'method': value['method'],
		'at': value['at'],
		'reauthenticated': value['reauthenticated']
	};
}

