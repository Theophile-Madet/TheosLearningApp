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

import type { RecoveryCodesAuthenticator } from './RecoveryCodesAuthenticator';
import {
	instanceOfRecoveryCodesAuthenticator,
	RecoveryCodesAuthenticatorFromJSONTyped,
	RecoveryCodesAuthenticatorToJSON
} from './RecoveryCodesAuthenticator';
import type { TOTPAuthenticator } from './TOTPAuthenticator';
import {
	instanceOfTOTPAuthenticator,
	TOTPAuthenticatorFromJSONTyped,
	TOTPAuthenticatorToJSON
} from './TOTPAuthenticator';

/**
 * @type AuthenticatorListInner
 *
 * @export
 */
export type AuthenticatorListInner = RecoveryCodesAuthenticator | TOTPAuthenticator;

export function AuthenticatorListInnerFromJSON(json: any): AuthenticatorListInner {
	return AuthenticatorListInnerFromJSONTyped(json, false);
}

export function AuthenticatorListInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): AuthenticatorListInner {
	if (json == null) {
		return json;
	}
	if (instanceOfRecoveryCodesAuthenticator(json)) {
		return RecoveryCodesAuthenticatorFromJSONTyped(json, true);
	}
	if (instanceOfTOTPAuthenticator(json)) {
		return TOTPAuthenticatorFromJSONTyped(json, true);
	}
}

export function AuthenticatorListInnerToJSON(value?: AuthenticatorListInner | null): any {
	if (value == null) {
		return value;
	}

	if (instanceOfRecoveryCodesAuthenticator(value)) {
		return RecoveryCodesAuthenticatorToJSON(value as RecoveryCodesAuthenticator);
	}
	if (instanceOfTOTPAuthenticator(value)) {
		return TOTPAuthenticatorToJSON(value as TOTPAuthenticator);
	}

	return {};
}

