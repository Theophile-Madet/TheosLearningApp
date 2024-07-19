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

/**
 *
 * @export
 * @interface BaseAuthenticator
 */
export interface BaseAuthenticator {
	/**
	 * An epoch based timestamp (trivial to parse using: `new Date(value)*1000`)
	 *
	 * @type {number}
	 * @memberof BaseAuthenticator
	 */
	lastUsedAt: number;
	/**
	 * An epoch based timestamp (trivial to parse using: `new Date(value)*1000`)
	 *
	 * @type {number}
	 * @memberof BaseAuthenticator
	 */
	createdAt: number;
}

/**
 * Check if a given object implements the BaseAuthenticator interface.
 */
export function instanceOfBaseAuthenticator(value: object): value is BaseAuthenticator {
	if (!('lastUsedAt' in value) || value['lastUsedAt'] === undefined) return false;
	if (!('createdAt' in value) || value['createdAt'] === undefined) return false;
	return true;
}

export function BaseAuthenticatorFromJSON(json: any): BaseAuthenticator {
	return BaseAuthenticatorFromJSONTyped(json, false);
}

export function BaseAuthenticatorFromJSONTyped(json: any, ignoreDiscriminator: boolean): BaseAuthenticator {
	if (json == null) {
		return json;
	}
	return {

		'lastUsedAt': json['last_used_at'],
		'createdAt': json['created_at']
	};
}

export function BaseAuthenticatorToJSON(value?: BaseAuthenticator | null): any {
	if (value == null) {
		return value;
	}
	return {

		'last_used_at': value['lastUsedAt'],
		'created_at': value['createdAt']
	};
}
