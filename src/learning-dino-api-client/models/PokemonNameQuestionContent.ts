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
 * @interface PokemonNameQuestionContent
 */
export interface PokemonNameQuestionContent {
	/**
	 *
	 * @type {number}
	 * @memberof PokemonNameQuestionContent
	 */
	pokemonId: number;
	/**
	 *
	 * @type {string}
	 * @memberof PokemonNameQuestionContent
	 */
	givenName: string;
	/**
	 *
	 * @type {number}
	 * @memberof PokemonNameQuestionContent
	 */
	givenLanguageId: number;
	/**
	 *
	 * @type {string}
	 * @memberof PokemonNameQuestionContent
	 */
	givenLanguageName: string;
	/**
	 *
	 * @type {string}
	 * @memberof PokemonNameQuestionContent
	 */
	expectedName: string;
	/**
	 *
	 * @type {number}
	 * @memberof PokemonNameQuestionContent
	 */
	expectedLanguageId: number;
	/**
	 *
	 * @type {string}
	 * @memberof PokemonNameQuestionContent
	 */
	expectedLanguageName: string;
}

/**
 * Check if a given object implements the PokemonNameQuestionContent interface.
 */
export function instanceOfPokemonNameQuestionContent(value: object): value is PokemonNameQuestionContent {
	if (!('pokemonId' in value) || value['pokemonId'] === undefined) return false;
	if (!('givenName' in value) || value['givenName'] === undefined) return false;
	if (!('givenLanguageId' in value) || value['givenLanguageId'] === undefined) return false;
	if (!('givenLanguageName' in value) || value['givenLanguageName'] === undefined) return false;
	if (!('expectedName' in value) || value['expectedName'] === undefined) return false;
	if (!('expectedLanguageId' in value) || value['expectedLanguageId'] === undefined) return false;
	if (!('expectedLanguageName' in value) || value['expectedLanguageName'] === undefined) return false;
	return true;
}

export function PokemonNameQuestionContentFromJSON(json: any): PokemonNameQuestionContent {
	return PokemonNameQuestionContentFromJSONTyped(json, false);
}

export function PokemonNameQuestionContentFromJSONTyped(json: any, ignoreDiscriminator: boolean): PokemonNameQuestionContent {
	if (json == null) {
		return json;
	}
	return {

		'pokemonId': json['pokemon_id'],
		'givenName': json['given_name'],
		'givenLanguageId': json['given_language_id'],
		'givenLanguageName': json['given_language_name'],
		'expectedName': json['expected_name'],
		'expectedLanguageId': json['expected_language_id'],
		'expectedLanguageName': json['expected_language_name']
	};
}

export function PokemonNameQuestionContentToJSON(value?: PokemonNameQuestionContent | null): any {
	if (value == null) {
		return value;
	}
	return {

		'pokemon_id': value['pokemonId'],
		'given_name': value['givenName'],
		'given_language_id': value['givenLanguageId'],
		'given_language_name': value['givenLanguageName'],
		'expected_name': value['expectedName'],
		'expected_language_id': value['expectedLanguageId'],
		'expected_language_name': value['expectedLanguageName']
	};
}

