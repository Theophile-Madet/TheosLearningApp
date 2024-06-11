export const actions = {
	default: async ({ cookies, request, fetch }) => {
		const data = await request.formData();

		const test = await fetch('http://localhost:8000/accounts/login/', {
			method: 'POST',
			body: JSON.stringify(data)
		});
		console.log(await test.json());
	}
};
