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

import { mapValues } from '../runtime';
import type { User } from './User';
import {
	UserFromJSON,
	UserFromJSONTyped,
	UserToJSON
} from './User';
import type { AuthenticationMethod } from './AuthenticationMethod';
import {
	AuthenticationMethodFromJSON,
	AuthenticationMethodFromJSONTyped,
	AuthenticationMethodToJSON
} from './AuthenticationMethod';

/**
 *
 * @export
 * @interface Authenticated
 */
export interface Authenticated {
	/**
	 *
	 * @type {User}
	 * @memberof Authenticated
	 */
	user: User;
	/**
	 * A list of methods used to authenticate.
	 *
	 * @type {Array<AuthenticationMethod>}
	 * @memberof Authenticated
	 */
	methods: Array<AuthenticationMethod>;
}

/**
 * Check if a given object implements the Authenticated interface.
 */
export function instanceOfAuthenticated(value: object): value is Authenticated {
	if (!('user' in value) || value['user'] === undefined) return false;
	if (!('methods' in value) || value['methods'] === undefined) return false;
	return true;
}

export function AuthenticatedFromJSON(json: any): Authenticated {
	return AuthenticatedFromJSONTyped(json, false);
}

export function AuthenticatedFromJSONTyped(json: any, ignoreDiscriminator: boolean): Authenticated {
	if (json == null) {
		return json;
	}
	return {

		'user': UserFromJSON(json['user']),
		'methods': ((json['methods'] as Array<any>).map(AuthenticationMethodFromJSON))
	};
}

export function AuthenticatedToJSON(value?: Authenticated | null): any {
	if (value == null) {
		return value;
	}
	return {

		'user': UserToJSON(value['user']),
		'methods': ((value['methods'] as Array<any>).map(AuthenticationMethodToJSON))
	};
}

