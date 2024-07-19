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
 * @interface AllauthClientV1AccountAuthenticatorsRecoveryCodesGet404Response
 */
export interface AllauthClientV1AccountAuthenticatorsRecoveryCodesGet404Response {
	/**
	 *
	 * @type {number}
	 * @memberof AllauthClientV1AccountAuthenticatorsRecoveryCodesGet404Response
	 */
	status: AllauthClientV1AccountAuthenticatorsRecoveryCodesGet404ResponseStatusEnum;
}


/**
 * @export
 */
export const AllauthClientV1AccountAuthenticatorsRecoveryCodesGet404ResponseStatusEnum = {
	NUMBER_404: 404
} as const;
export type AllauthClientV1AccountAuthenticatorsRecoveryCodesGet404ResponseStatusEnum = typeof AllauthClientV1AccountAuthenticatorsRecoveryCodesGet404ResponseStatusEnum[keyof typeof AllauthClientV1AccountAuthenticatorsRecoveryCodesGet404ResponseStatusEnum];


/**
 * Check if a given object implements the AllauthClientV1AccountAuthenticatorsRecoveryCodesGet404Response interface.
 */
export function instanceOfAllauthClientV1AccountAuthenticatorsRecoveryCodesGet404Response(value: object): value is AllauthClientV1AccountAuthenticatorsRecoveryCodesGet404Response {
	if (!('status' in value) || value['status'] === undefined) return false;
	return true;
}

export function AllauthClientV1AccountAuthenticatorsRecoveryCodesGet404ResponseFromJSON(json: any): AllauthClientV1AccountAuthenticatorsRecoveryCodesGet404Response {
	return AllauthClientV1AccountAuthenticatorsRecoveryCodesGet404ResponseFromJSONTyped(json, false);
}

export function AllauthClientV1AccountAuthenticatorsRecoveryCodesGet404ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): AllauthClientV1AccountAuthenticatorsRecoveryCodesGet404Response {
	if (json == null) {
		return json;
	}
	return {

		'status': json['status']
	};
}

export function AllauthClientV1AccountAuthenticatorsRecoveryCodesGet404ResponseToJSON(value?: AllauthClientV1AccountAuthenticatorsRecoveryCodesGet404Response | null): any {
	if (value == null) {
		return value;
	}
	return {

		'status': value['status']
	};
}

