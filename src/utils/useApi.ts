import { Configuration } from '../api-client';

export function useApi<T>(ApiClient: new (configuration: Configuration) => T): T {
	return new ApiClient(
		new Configuration({
			basePath: 'http://localhost:8000'
		})
	);
}
