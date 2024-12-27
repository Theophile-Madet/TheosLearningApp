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

/**
 *
 * @export
 * @interface Signup
 */
export interface Signup {
	/**
	 * The email address.
	 *
	 * @type {string}
	 * @memberof Signup
	 */
	email?: string;
	/**
	 * The username.
	 *
	 * @type {string}
	 * @memberof Signup
	 */
	username?: string;
	/**
	 * The password.
	 *
	 * @type {string}
	 * @memberof Signup
	 */
	password: string;
}

/**
 * Check if a given object implements the Signup interface.
 */
export function instanceOfSignup(value: object): value is Signup {
	if (!('password' in value) || value['password'] === undefined) return false;
	return true;
}

export function SignupFromJSON(json: any): Signup {
	return SignupFromJSONTyped(json, false);
}

export function SignupFromJSONTyped(json: any, ignoreDiscriminator: boolean): Signup {
	if (json == null) {
		return json;
	}
	return {

		'email': json['email'] == null ? undefined : json['email'],
		'username': json['username'] == null ? undefined : json['username'],
		'password': json['password']
	};
}

export function SignupToJSON(value?: Signup | null): any {
	if (value == null) {
		return value;
	}
	return {

		'email': value['email'],
		'username': value['username'],
		'password': value['password']
	};
}

