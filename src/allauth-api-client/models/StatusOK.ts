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
 */
export const StatusOK = {
	NUMBER_200: 200
} as const;
export type StatusOK = typeof StatusOK[keyof typeof StatusOK];


export function instanceOfStatusOK(value: any): boolean {
	for (const key in StatusOK) {
		if (Object.prototype.hasOwnProperty.call(StatusOK, key)) {
			if (StatusOK[key] === value) {
				return true;
			}
		}
	}
	return false;
}

export function StatusOKFromJSON(json: any): StatusOK {
	return StatusOKFromJSONTyped(json, false);
}

export function StatusOKFromJSONTyped(json: any, ignoreDiscriminator: boolean): StatusOK {
	return json as StatusOK;
}

export function StatusOKToJSON(value?: StatusOK | null): any {
	return value as any;
}

