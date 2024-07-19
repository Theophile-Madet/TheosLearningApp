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
 * @interface ErrorResponseErrorsInner
 */
export interface ErrorResponseErrorsInner {
	/**
	 * An error code.
	 *
	 * @type {string}
	 * @memberof ErrorResponseErrorsInner
	 */
	code: string;
	/**
	 * The name of the input parameter that was incorrect.
	 *
	 * @type {string}
	 * @memberof ErrorResponseErrorsInner
	 */
	param?: string;
	/**
	 * A human readable error message.
	 *
	 * @type {number}
	 * @memberof ErrorResponseErrorsInner
	 */
	message: number;
}

/**
 * Check if a given object implements the ErrorResponseErrorsInner interface.
 */
export function instanceOfErrorResponseErrorsInner(value: object): value is ErrorResponseErrorsInner {
	if (!('code' in value) || value['code'] === undefined) return false;
	if (!('message' in value) || value['message'] === undefined) return false;
	return true;
}

export function ErrorResponseErrorsInnerFromJSON(json: any): ErrorResponseErrorsInner {
	return ErrorResponseErrorsInnerFromJSONTyped(json, false);
}

export function ErrorResponseErrorsInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): ErrorResponseErrorsInner {
	if (json == null) {
		return json;
	}
	return {

		'code': json['code'],
		'param': json['param'] == null ? undefined : json['param'],
		'message': json['message']
	};
}

export function ErrorResponseErrorsInnerToJSON(value?: ErrorResponseErrorsInner | null): any {
	if (value == null) {
		return value;
	}
	return {

		'code': value['code'],
		'param': value['param'],
		'message': value['message']
	};
}
