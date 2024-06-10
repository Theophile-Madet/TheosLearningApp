import { useApi } from '../../utils/useApi';
import { AccountsApi } from '../../api-client';

export const actions = {
	default: async ({ cookies, request, fetch }) => {
		const data = await request.formData();

		const api = useApi(AccountsApi);
		const bla = await api.accountsApiGetCsrfTokenRetrieve();
		console.log(bla);
		const test = await fetch('http://localhost:8000/accounts/login/', {
			method: 'POST',
			body: JSON.stringify(data)
		});
		console.log(await test.json());
	}
};
