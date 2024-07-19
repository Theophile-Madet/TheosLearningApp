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

import type { Provider } from './Provider';
import { ProviderFromJSON, ProviderToJSON } from './Provider';

/**
 * Configuration of the Django `allauth.socialaccount` app.
 *
 * @export
 * @interface SocialAccountConfiguration
 */
export interface SocialAccountConfiguration {
	/**
	 *
	 * @type {Array<Provider>}
	 * @memberof SocialAccountConfiguration
	 */
	providers: Array<Provider>;
}

/**
 * Check if a given object implements the SocialAccountConfiguration interface.
 */
export function instanceOfSocialAccountConfiguration(value: object): value is SocialAccountConfiguration {
	if (!('providers' in value) || value['providers'] === undefined) return false;
	return true;
}

export function SocialAccountConfigurationFromJSON(json: any): SocialAccountConfiguration {
	return SocialAccountConfigurationFromJSONTyped(json, false);
}

export function SocialAccountConfigurationFromJSONTyped(json: any, ignoreDiscriminator: boolean): SocialAccountConfiguration {
	if (json == null) {
		return json;
	}
	return {

		'providers': ((json['providers'] as Array<any>).map(ProviderFromJSON))
	};
}

export function SocialAccountConfigurationToJSON(value?: SocialAccountConfiguration | null): any {
	if (value == null) {
		return value;
	}
	return {

		'providers': ((value['providers'] as Array<any>).map(ProviderToJSON))
	};
}
