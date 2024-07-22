import { Configuration as Configuration, type FetchAPI, type HTTPHeaders } from '../allauth-api-client';

export function useAllauthApi<T>(ApiClient: new (configuration: Configuration) => T, fetch?: FetchAPI, csrfToken?: string): T {
	const headers: HTTPHeaders = {};
	if (csrfToken) {
		// headers['X-CSRF-Token'] = csrfToken;
		headers['x-csrftoken'] = csrfToken;
	}

	return new ApiClient(
		new Configuration({
			basePath: 'https://learnapi.seriousdino.org',
			// use the FetchAPI from SvelteKit because it contains the cookies and headers
			// from the browser request
			// This way, if the user is logged in to the Django server on his browser,
			// the requests coming from SvelteKit are also logged in
			fetchApi: fetch,
			credentials: 'include',
			headers: headers
		})
	);
}
