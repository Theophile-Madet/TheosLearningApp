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


import * as runtime from '../runtime';
import type {
	CsrfToken,
	GetNextWord,
	MarkAnswerAsWrongRequest,
	MarkWordAsInvalidRequest,
	SendAnswerRequest,
	WasAnswerCorrect
} from '../models/index';
import {
	CsrfTokenFromJSON,
	GetNextWordFromJSON,
	MarkAnswerAsWrongRequestToJSON,
	MarkWordAsInvalidRequestToJSON,
	SendAnswerRequestToJSON,
	WasAnswerCorrectFromJSON
} from '../models/index';

export interface LearningApiMarkAnswerAsWrongCreateRequest {
	markAnswerAsWrongRequest: MarkAnswerAsWrongRequest;
}

export interface LearningApiMarkWordAsInvalidCreateRequest {
	markWordAsInvalidRequest: MarkWordAsInvalidRequest;
}

export interface LearningApiSendAnswerCreateRequest {
	sendAnswerRequest: SendAnswerRequest;
}

/**
 *
 */
export class LearningApi extends runtime.BaseAPI {

	/**
	 */
	async learningApiGetCsrfTokenRetrieveRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CsrfToken>> {
		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		const response = await this.request({
			path: `/learning/api/get_csrf_token`,
			method: 'GET',
			headers: headerParameters,
			query: queryParameters
		}, initOverrides);

		return new runtime.JSONApiResponse(response, (jsonValue) => CsrfTokenFromJSON(jsonValue));
	}

	/**
	 */
	async learningApiGetCsrfTokenRetrieve(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CsrfToken> {
		const response = await this.learningApiGetCsrfTokenRetrieveRaw(initOverrides);
		return await response.value();
	}

	/**
	 */
	async learningApiGetNextWordRetrieveRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetNextWord>> {
		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		const response = await this.request({
			path: `/learning/api/get_next_word/`,
			method: 'GET',
			headers: headerParameters,
			query: queryParameters
		}, initOverrides);

		return new runtime.JSONApiResponse(response, (jsonValue) => GetNextWordFromJSON(jsonValue));
	}

	/**
	 */
	async learningApiGetNextWordRetrieve(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetNextWord> {
		const response = await this.learningApiGetNextWordRetrieveRaw(initOverrides);
		return await response.value();
	}

	/**
	 */
	async learningApiMarkAnswerAsWrongCreateRaw(requestParameters: LearningApiMarkAnswerAsWrongCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
		if (requestParameters['markAnswerAsWrongRequest'] == null) {
			throw new runtime.RequiredError(
				'markAnswerAsWrongRequest',
				'Required parameter "markAnswerAsWrongRequest" was null or undefined when calling learningApiMarkAnswerAsWrongCreate().'
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		headerParameters['Content-Type'] = 'application/json';

		const response = await this.request({
			path: `/learning/api/mark_answer_as_wrong/`,
			method: 'POST',
			headers: headerParameters,
			query: queryParameters,
			body: MarkAnswerAsWrongRequestToJSON(requestParameters['markAnswerAsWrongRequest'])
		}, initOverrides);

		return new runtime.VoidApiResponse(response);
	}

	/**
	 */
	async learningApiMarkAnswerAsWrongCreate(requestParameters: LearningApiMarkAnswerAsWrongCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
		await this.learningApiMarkAnswerAsWrongCreateRaw(requestParameters, initOverrides);
	}

	/**
	 */
	async learningApiMarkWordAsInvalidCreateRaw(requestParameters: LearningApiMarkWordAsInvalidCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
		if (requestParameters['markWordAsInvalidRequest'] == null) {
			throw new runtime.RequiredError(
				'markWordAsInvalidRequest',
				'Required parameter "markWordAsInvalidRequest" was null or undefined when calling learningApiMarkWordAsInvalidCreate().'
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		headerParameters['Content-Type'] = 'application/json';

		const response = await this.request({
			path: `/learning/api/mark_word_as_invalid/`,
			method: 'POST',
			headers: headerParameters,
			query: queryParameters,
			body: MarkWordAsInvalidRequestToJSON(requestParameters['markWordAsInvalidRequest'])
		}, initOverrides);

		return new runtime.VoidApiResponse(response);
	}

	/**
	 */
	async learningApiMarkWordAsInvalidCreate(requestParameters: LearningApiMarkWordAsInvalidCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
		await this.learningApiMarkWordAsInvalidCreateRaw(requestParameters, initOverrides);
	}

	/**
	 */
	async learningApiSendAnswerCreateRaw(requestParameters: LearningApiSendAnswerCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<WasAnswerCorrect>> {
		if (requestParameters['sendAnswerRequest'] == null) {
			throw new runtime.RequiredError(
				'sendAnswerRequest',
				'Required parameter "sendAnswerRequest" was null or undefined when calling learningApiSendAnswerCreate().'
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		headerParameters['Content-Type'] = 'application/json';

		const response = await this.request({
			path: `/learning/api/send_answer/`,
			method: 'POST',
			headers: headerParameters,
			query: queryParameters,
			body: SendAnswerRequestToJSON(requestParameters['sendAnswerRequest'])
		}, initOverrides);

		return new runtime.JSONApiResponse(response, (jsonValue) => WasAnswerCorrectFromJSON(jsonValue));
	}

	/**
	 */
	async learningApiSendAnswerCreate(requestParameters: LearningApiSendAnswerCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<WasAnswerCorrect> {
		const response = await this.learningApiSendAnswerCreateRaw(requestParameters, initOverrides);
		return await response.value();
	}

}
