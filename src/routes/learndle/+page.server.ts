import type { PageServerLoad } from './$types';
import { useApi } from '../../utils/useApi';
import { type FetchAPI, LearningApi } from '../../api-client';
import type { Actions } from '../../../.svelte-kit/types/src/routes/sverdle/$types';

async function fetchNextWord(fetch: FetchAPI) {
	const learningApi = useApi(LearningApi, fetch);
	return await learningApi.learningApiGetNextWordRetrieve();
}

export const load = (async ({ fetch }) => {
	return {
		wordToGuess: await fetchNextWord(fetch)
	};
}) satisfies PageServerLoad;

export const actions = {
	answer: async ({ fetch, request, cookies }) => {
		const data = await request.formData();
		const answer = (data.get('answer') ?? 'not found') as string;
		const wordId = (data.get('wordId') ?? -1) as number;
		const word = data.get('word');

		const learningApi = useApi(LearningApi, fetch, cookies.get('csrftoken') ?? undefined);
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

		const learningApi = useApi(LearningApi, fetch, cookies.get('csrftoken') ?? undefined);
		await learningApi.learningApiMarkWordAsInvalidCreate({
			markWordAsInvalidRequest: {
				wordId: wordId
			}
		});
	}
} satisfies Actions;