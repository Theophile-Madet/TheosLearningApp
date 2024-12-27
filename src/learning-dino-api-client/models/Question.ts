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

import { mapValues } from '../runtime';
import type { PokemonNameQuestionContent } from './PokemonNameQuestionContent';
import {
	PokemonNameQuestionContentFromJSON,
	PokemonNameQuestionContentFromJSONTyped,
	PokemonNameQuestionContentToJSON
} from './PokemonNameQuestionContent';
import type { GermanWordQuestionContent } from './GermanWordQuestionContent';
import {
	GermanWordQuestionContentFromJSON,
	GermanWordQuestionContentFromJSONTyped,
	GermanWordQuestionContentToJSON
} from './GermanWordQuestionContent';
import type { QuestionStats } from './QuestionStats';
import {
	QuestionStatsFromJSON,
	QuestionStatsFromJSONTyped,
	QuestionStatsToJSON
} from './QuestionStats';
import type { QuestionTypeEnum } from './QuestionTypeEnum';
import {
	QuestionTypeEnumFromJSON,
	QuestionTypeEnumFromJSONTyped,
	QuestionTypeEnumToJSON
} from './QuestionTypeEnum';

/**
 *
 * @export
 * @interface Question
 */
export interface Question {
	/**
	 *
	 * @type {QuestionTypeEnum}
	 * @memberof Question
	 */
	questionType: QuestionTypeEnum;
	/**
	 *
	 * @type {GermanWordQuestionContent}
	 * @memberof Question
	 */
	germanWordContent: GermanWordQuestionContent | null;
	/**
	 *
	 * @type {PokemonNameQuestionContent}
	 * @memberof Question
	 */
	pokemonNameContent: PokemonNameQuestionContent | null;
	/**
	 *
	 * @type {QuestionStats}
	 * @memberof Question
	 */
	stats: QuestionStats;
}

/**
 * Check if a given object implements the Question interface.
 */
export function instanceOfQuestion(value: object): value is Question {
	if (!('questionType' in value) || value['questionType'] === undefined) return false;
	if (!('germanWordContent' in value) || value['germanWordContent'] === undefined) return false;
	if (!('pokemonNameContent' in value) || value['pokemonNameContent'] === undefined) return false;
	if (!('stats' in value) || value['stats'] === undefined) return false;
	return true;
}

export function QuestionFromJSON(json: any): Question {
	return QuestionFromJSONTyped(json, false);
}

export function QuestionFromJSONTyped(json: any, ignoreDiscriminator: boolean): Question {
	if (json == null) {
		return json;
	}
	return {

		'questionType': QuestionTypeEnumFromJSON(json['question_type']),
		'germanWordContent': GermanWordQuestionContentFromJSON(json['german_word_content']),
		'pokemonNameContent': PokemonNameQuestionContentFromJSON(json['pokemon_name_content']),
		'stats': QuestionStatsFromJSON(json['stats'])
	};
}

export function QuestionToJSON(value?: Question | null): any {
	if (value == null) {
		return value;
	}
	return {

		'question_type': QuestionTypeEnumToJSON(value['questionType']),
		'german_word_content': GermanWordQuestionContentToJSON(value['germanWordContent']),
		'pokemon_name_content': PokemonNameQuestionContentToJSON(value['pokemonNameContent']),
		'stats': QuestionStatsToJSON(value['stats'])
	};
}

