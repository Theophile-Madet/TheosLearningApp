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
 * @interface VerifyEmail
 */
export interface VerifyEmail {
	/**
	 * The email verification key
	 * @type {string}
	 * @memberof VerifyEmail
	 */
	key: string;
}

/**
 * Check if a given object implements the VerifyEmail interface.
 */
export function instanceOfVerifyEmail(value: object): value is VerifyEmail {
	if (!('key' in value) || value['key'] === undefined) return false;
	return true;
}

export function VerifyEmailFromJSON(json: any): VerifyEmail {
	return VerifyEmailFromJSONTyped(json, false);
}

export function VerifyEmailFromJSONTyped(json: any, ignoreDiscriminator: boolean): VerifyEmail {
	if (json == null) {
		return json;
	}
	return {

		'key': json['key']
	};
}

export function VerifyEmailToJSON(value?: VerifyEmail | null): any {
	if (value == null) {
		return value;
	}
	return {

		'key': value['key']
	};
}
