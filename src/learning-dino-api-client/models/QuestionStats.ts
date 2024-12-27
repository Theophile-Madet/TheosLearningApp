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

/**
 *
 * @export
 * @interface QuestionStats
 */
export interface QuestionStats {
	/**
	 *
	 * @type {number}
	 * @memberof QuestionStats
	 */
	nbAnswersTotal: number;
	/**
	 *
	 * @type {number}
	 * @memberof QuestionStats
	 */
	nbAnswersCorrect: number;
	/**
	 *
	 * @type {number}
	 * @memberof QuestionStats
	 */
	nbAnswersCorrectInARow: number;
}

/**
 * Check if a given object implements the QuestionStats interface.
 */
export function instanceOfQuestionStats(value: object): value is QuestionStats {
	if (!('nbAnswersTotal' in value) || value['nbAnswersTotal'] === undefined) return false;
	if (!('nbAnswersCorrect' in value) || value['nbAnswersCorrect'] === undefined) return false;
	if (!('nbAnswersCorrectInARow' in value) || value['nbAnswersCorrectInARow'] === undefined) return false;
	return true;
}

export function QuestionStatsFromJSON(json: any): QuestionStats {
	return QuestionStatsFromJSONTyped(json, false);
}

export function QuestionStatsFromJSONTyped(json: any, ignoreDiscriminator: boolean): QuestionStats {
	if (json == null) {
		return json;
	}
	return {

		'nbAnswersTotal': json['nb_answers_total'],
		'nbAnswersCorrect': json['nb_answers_correct'],
		'nbAnswersCorrectInARow': json['nb_answers_correct_in_a_row']
	};
}

export function QuestionStatsToJSON(value?: QuestionStats | null): any {
	if (value == null) {
		return value;
	}
	return {

		'nb_answers_total': value['nbAnswersTotal'],
		'nb_answers_correct': value['nbAnswersCorrect'],
		'nb_answers_correct_in_a_row': value['nbAnswersCorrectInARow']
	};
}

