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

import type { AuthenticationResponse } from './AuthenticationResponse';
import {
	instanceOfAuthenticationResponse,
	AuthenticationResponseFromJSON,
	AuthenticationResponseFromJSONTyped,
	AuthenticationResponseToJSON
} from './AuthenticationResponse';
import type { ReauthenticationResponse } from './ReauthenticationResponse';
import {
	instanceOfReauthenticationResponse,
	ReauthenticationResponseFromJSON,
	ReauthenticationResponseFromJSONTyped,
	ReauthenticationResponseToJSON
} from './ReauthenticationResponse';

/**
 * @type AllauthClientV1AccountEmailPost401Response
 * 
 * @export
 */
export type AllauthClientV1AccountEmailPost401Response = AuthenticationResponse | ReauthenticationResponse;

export function AllauthClientV1AccountEmailPost401ResponseFromJSON(json: any): AllauthClientV1AccountEmailPost401Response {
	return AllauthClientV1AccountEmailPost401ResponseFromJSONTyped(json, false);
}

export function AllauthClientV1AccountEmailPost401ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): AllauthClientV1AccountEmailPost401Response {
	if (json == null) {
		return json;
	}
	if (instanceOfAuthenticationResponse(json)) {
		return AuthenticationResponseFromJSONTyped(json, true);
	}
	if (instanceOfReauthenticationResponse(json)) {
		return ReauthenticationResponseFromJSONTyped(json, true);
	}
}

export function AllauthClientV1AccountEmailPost401ResponseToJSON(value?: AllauthClientV1AccountEmailPost401Response | null): any {
	if (value == null) {
		return value;
	}

	if (instanceOfAuthenticationResponse(value)) {
		return AuthenticationResponseToJSON(value as AuthenticationResponse);
	}
	if (instanceOfReauthenticationResponse(value)) {
		return ReauthenticationResponseToJSON(value as ReauthenticationResponse);
	}

	return {};
}

