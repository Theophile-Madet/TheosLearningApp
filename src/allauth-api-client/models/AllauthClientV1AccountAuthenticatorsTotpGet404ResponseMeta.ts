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
 * @interface AllauthClientV1AccountAuthenticatorsTotpGet404ResponseMeta
 */
export interface AllauthClientV1AccountAuthenticatorsTotpGet404ResponseMeta {
	/**
	 * A TOTP secret that can be used to setup a new authenticator.
	 *
	 * @type {string}
	 * @memberof AllauthClientV1AccountAuthenticatorsTotpGet404ResponseMeta
	 */
	secret: string;
}

/**
 * Check if a given object implements the AllauthClientV1AccountAuthenticatorsTotpGet404ResponseMeta interface.
 */
export function instanceOfAllauthClientV1AccountAuthenticatorsTotpGet404ResponseMeta(value: object): value is AllauthClientV1AccountAuthenticatorsTotpGet404ResponseMeta {
	if (!('secret' in value) || value['secret'] === undefined) return false;
	return true;
}

export function AllauthClientV1AccountAuthenticatorsTotpGet404ResponseMetaFromJSON(json: any): AllauthClientV1AccountAuthenticatorsTotpGet404ResponseMeta {
	return AllauthClientV1AccountAuthenticatorsTotpGet404ResponseMetaFromJSONTyped(json, false);
}

export function AllauthClientV1AccountAuthenticatorsTotpGet404ResponseMetaFromJSONTyped(json: any, ignoreDiscriminator: boolean): AllauthClientV1AccountAuthenticatorsTotpGet404ResponseMeta {
	if (json == null) {
		return json;
	}
	return {

		'secret': json['secret']
	};
}

export function AllauthClientV1AccountAuthenticatorsTotpGet404ResponseMetaToJSON(value?: AllauthClientV1AccountAuthenticatorsTotpGet404ResponseMeta | null): any {
	if (value == null) {
		return value;
	}
	return {

		'secret': value['secret']
	};
}

