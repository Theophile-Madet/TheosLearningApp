import type { HTTPHeaders } from '../../allauth-api-client';

export const actions = {
	default: async ({ cookies, request, fetch }) => {
		const data = await request.formData();

		const headers: HTTPHeaders = {};
		headers['x-csrftoken'] = cookies.get('csrftoken') || 'not_set';

		await fetch('http://localhost:8000/accounts/login/', {
			method: 'POST',
			body: data,
			headers: headers
		});
	}
};
