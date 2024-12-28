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

import type { WasAnswerCorrect } from './WasAnswerCorrect';
import { WasAnswerCorrectFromJSON, WasAnswerCorrectToJSON } from './WasAnswerCorrect';

/**
 *
 * @export
 * @interface WasAnswerCorrectPokemonName
 */
export interface WasAnswerCorrectPokemonName {
	/**
	 *
	 * @type {WasAnswerCorrect}
	 * @memberof WasAnswerCorrectPokemonName
	 */
	wasCorrectGivenLanguage: WasAnswerCorrect | null;
	/**
	 *
	 * @type {WasAnswerCorrect}
	 * @memberof WasAnswerCorrectPokemonName
	 */
	wasCorrectExpectedLanguage: WasAnswerCorrect;
}

/**
 * Check if a given object implements the WasAnswerCorrectPokemonName interface.
 */
export function instanceOfWasAnswerCorrectPokemonName(value: object): value is WasAnswerCorrectPokemonName {
	if (!('wasCorrectGivenLanguage' in value) || value['wasCorrectGivenLanguage'] === undefined) return false;
	if (!('wasCorrectExpectedLanguage' in value) || value['wasCorrectExpectedLanguage'] === undefined) return false;
	return true;
}

export function WasAnswerCorrectPokemonNameFromJSON(json: any): WasAnswerCorrectPokemonName {
	return WasAnswerCorrectPokemonNameFromJSONTyped(json, false);
}

export function WasAnswerCorrectPokemonNameFromJSONTyped(json: any, ignoreDiscriminator: boolean): WasAnswerCorrectPokemonName {
	if (json == null) {
		return json;
	}
	return {

		'wasCorrectGivenLanguage': WasAnswerCorrectFromJSON(json['was_correct_given_language']),
		'wasCorrectExpectedLanguage': WasAnswerCorrectFromJSON(json['was_correct_expected_language'])
	};
}

export function WasAnswerCorrectPokemonNameToJSON(value?: WasAnswerCorrectPokemonName | null): any {
	if (value == null) {
		return value;
	}
	return {

		'was_correct_given_language': WasAnswerCorrectToJSON(value['wasCorrectGivenLanguage']),
		'was_correct_expected_language': WasAnswerCorrectToJSON(value['wasCorrectExpectedLanguage'])
	};
}

