/* tslint:disable */
/* eslint-disable */
/**
 *
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/**
 *
 * @export
 * @interface MarkWordAsInvalidRequest
 */
export interface MarkWordAsInvalidRequest {
	/**
	 *
	 * @type {number}
	 * @memberof MarkWordAsInvalidRequest
	 */
	wordId: number;
}

/**
 * Check if a given object implements the MarkWordAsInvalidRequest interface.
 */
export function instanceOfMarkWordAsInvalidRequest(
	value: object
): value is MarkWordAsInvalidRequest {
	if (!('wordId' in value) || value['wordId'] === undefined) return false;
	return true;
}

export function MarkWordAsInvalidRequestFromJSON(json: any): MarkWordAsInvalidRequest {
	return MarkWordAsInvalidRequestFromJSONTyped(json, false);
}

export function MarkWordAsInvalidRequestFromJSONTyped(
	json: any,
	ignoreDiscriminator: boolean
): MarkWordAsInvalidRequest {
	if (json == null) {
		return json;
	}
	return {
		wordId: json['word_id']
	};
}

export function MarkWordAsInvalidRequestToJSON(value?: MarkWordAsInvalidRequest | null): any {
	if (value == null) {
		return value;
	}
	return {
		word_id: value['wordId']
	};
}
