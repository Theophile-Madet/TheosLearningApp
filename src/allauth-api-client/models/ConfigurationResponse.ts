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

import type { ConfigurationResponseData } from './ConfigurationResponseData';
import { ConfigurationResponseDataFromJSON, ConfigurationResponseDataToJSON } from './ConfigurationResponseData';
import type { StatusOK } from './StatusOK';
import { StatusOKFromJSON, StatusOKToJSON } from './StatusOK';

/**
 *
 * @export
 * @interface ConfigurationResponse
 */
export interface ConfigurationResponse {
	/**
	 *
	 * @type {ConfigurationResponseData}
	 * @memberof ConfigurationResponse
	 */
	data: ConfigurationResponseData;
	/**
	 *
	 * @type {StatusOK}
	 * @memberof ConfigurationResponse
	 */
	status: StatusOK;
}

/**
 * Check if a given object implements the ConfigurationResponse interface.
 */
export function instanceOfConfigurationResponse(value: object): value is ConfigurationResponse {
	if (!('data' in value) || value['data'] === undefined) return false;
	if (!('status' in value) || value['status'] === undefined) return false;
	return true;
}

export function ConfigurationResponseFromJSON(json: any): ConfigurationResponse {
	return ConfigurationResponseFromJSONTyped(json, false);
}

export function ConfigurationResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ConfigurationResponse {
	if (json == null) {
		return json;
	}
	return {

		'data': ConfigurationResponseDataFromJSON(json['data']),
		'status': StatusOKFromJSON(json['status'])
	};
}

export function ConfigurationResponseToJSON(value?: ConfigurationResponse | null): any {
	if (value == null) {
		return value;
	}
	return {

		'data': ConfigurationResponseDataToJSON(value['data']),
		'status': StatusOKToJSON(value['status'])
	};
}
