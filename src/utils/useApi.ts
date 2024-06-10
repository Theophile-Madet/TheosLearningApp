import { Configuration, type FetchAPI } from '../api-client';

export function useApi<T>(ApiClient: new (configuration: Configuration) => T, fetch: FetchAPI): T {
	return new ApiClient(
		new Configuration({
			basePath: 'http://localhost:8000',
			// use the FetchAPI from SvelteKit because it contains the cookies and headers
			// from the browser request
			// This way, if the user is logged in to the Django server on his browser,
			// the requests coming from SvelteKit are also logged in
			fetchApi: fetch
		})
	);
}
