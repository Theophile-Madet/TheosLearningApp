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
 * @interface AllauthClientV1AccountPasswordChangePostRequest
 */
export interface AllauthClientV1AccountPasswordChangePostRequest {
	/**
	 * The password.
	 *
	 * @type {string}
	 * @memberof AllauthClientV1AccountPasswordChangePostRequest
	 */
	currentPassword?: string;
	/**
	 * The current password.
	 *
	 * @type {string}
	 * @memberof AllauthClientV1AccountPasswordChangePostRequest
	 */
	newPassword: string;
}

/**
 * Check if a given object implements the AllauthClientV1AccountPasswordChangePostRequest interface.
 */
export function instanceOfAllauthClientV1AccountPasswordChangePostRequest(value: object): value is AllauthClientV1AccountPasswordChangePostRequest {
	if (!('newPassword' in value) || value['newPassword'] === undefined) return false;
	return true;
}

export function AllauthClientV1AccountPasswordChangePostRequestFromJSON(json: any): AllauthClientV1AccountPasswordChangePostRequest {
	return AllauthClientV1AccountPasswordChangePostRequestFromJSONTyped(json, false);
}

export function AllauthClientV1AccountPasswordChangePostRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): AllauthClientV1AccountPasswordChangePostRequest {
	if (json == null) {
		return json;
	}
	return {

		'currentPassword': json['current_password'] == null ? undefined : json['current_password'],
		'newPassword': json['new_password']
	};
}

export function AllauthClientV1AccountPasswordChangePostRequestToJSON(value?: AllauthClientV1AccountPasswordChangePostRequest | null): any {
	if (value == null) {
		return value;
	}
	return {

		'current_password': value['currentPassword'],
		'new_password': value['newPassword']
	};
}

