import type { PageServerLoad } from './$types';
import { useLearningDinoApi } from '../../utils/useLearningDinoApi';
import type { Actions } from '../../../.svelte-kit/types/src/routes/sverdle/$types';
import { LearningApi, ResponseError } from '../../learning-dino-api-client';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ fetch }) => {
	const learningApi = useLearningDinoApi(LearningApi, fetch);

	const word = await learningApi.learningApiGetNextWordRetrieve().then((word) => {
		return word;
	}).catch((error: ResponseError) => {
		if (error.response.status === 403) {
			redirect(302, '/login');
		}
	});

	return {
		wordToGuess: word
	};
}) satisfies PageServerLoad;

export const actions = {
	answer: async ({ fetch, request, cookies }) => {
		const data = await request.formData();
		const answer = (data.get('answer') ?? 'not found') as string;
		const wordId = (data.get('wordId') ?? -1) as number;
		const word = data.get('word');

		const learningApi = useLearningDinoApi(LearningApi, fetch, cookies.get('csrftoken') ?? undefined);
		const isCorrect = await learningApi.learningApiSendAnswerCreate({
			sendAnswerRequest: {
				wordId: wordId,
				answer: answer
			}
		});

		return { lastWord: word, answerIsCorrect: isCorrect.correct, givenAnswer: answer };
	},

	markWordAsInvalid: async ({ fetch, request, cookies }) => {
		const data = await request.formData();
		const wordId = (data.get('wordId') ?? -1) as number;

		const learningApi = useLearningDinoApi(LearningApi, fetch, cookies.get('csrftoken') ?? undefined);
		await learningApi.learningApiMarkWordAsInvalidCreate({
			markWordAsInvalidRequest: {
				wordId: wordId
			}
		});
	}
} satisfies Actions;