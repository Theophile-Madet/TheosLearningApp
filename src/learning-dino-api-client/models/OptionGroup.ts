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

import type { Option } from './Option';
import { OptionFromJSON, OptionToJSON } from './Option';

/**
 *
 * @export
 * @interface OptionGroup
 */
export interface OptionGroup {
	/**
	 *
	 * @type {string}
	 * @memberof OptionGroup
	 */
	name: string;
	/**
	 *
	 * @type {Array<Option>}
	 * @memberof OptionGroup
	 */
	options: Array<Option>;
}

/**
 * Check if a given object implements the OptionGroup interface.
 */
export function instanceOfOptionGroup(value: object): value is OptionGroup {
	if (!('name' in value) || value['name'] === undefined) return false;
	if (!('options' in value) || value['options'] === undefined) return false;
	return true;
}

export function OptionGroupFromJSON(json: any): OptionGroup {
	return OptionGroupFromJSONTyped(json, false);
}

export function OptionGroupFromJSONTyped(json: any, ignoreDiscriminator: boolean): OptionGroup {
	if (json == null) {
		return json;
	}
	return {

		'name': json['name'],
		'options': ((json['options'] as Array<any>).map(OptionFromJSON))
	};
}

export function OptionGroupToJSON(value?: OptionGroup | null): any {
	if (value == null) {
		return value;
	}
	return {

		'name': value['name'],
		'options': ((value['options'] as Array<any>).map(OptionToJSON))
	};
}

