import type { PageServerLoad } from './$types';
import { useApi } from '../../utils/useApi';
import { type FetchAPI, LearningApi } from '../../api-client';

async function fetchData(fetch: FetchAPI) {
	const learningApi = useApi(LearningApi, fetch);
	return await learningApi.learningApiGetNextWordRetrieve();
}

export const load = (async ({ cookies, fetch }) => {
	return {
		wordToGuess: await fetchData(fetch)
	};
}) satisfies PageServerLoad;
