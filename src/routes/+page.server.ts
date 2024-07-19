import { useLearningDinoApi } from '../utils/useLearningDinoApi';
import { LearningApi, ResponseError } from '../learning-dino-api-client';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../../.svelte-kit/types/src/routes/$types';

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
