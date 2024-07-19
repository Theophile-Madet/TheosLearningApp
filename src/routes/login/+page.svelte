<script lang="ts">
	import { useLearningDinoApi } from '../../utils/useLearningDinoApi';
	import { getCookieValue } from '../../utils/getCookieValue';
	import { LearningApi } from '../../learning-dino-api-client';
	import { AuthenticationAccountApi, type ErrorResponse } from '../../allauth-api-client';
	import { useAllauthApi } from '../../utils/useAllauthApi';
	import { goto } from '$app/navigation';

	let username = '';
	let password = '';

	async function doLogin() {
		const learningApi = useLearningDinoApi(LearningApi);
		await learningApi.learningApiGetCsrfTokenRetrieve();

		const authenticationAccountApi = useAllauthApi(AuthenticationAccountApi, fetch, getCookieValue('csrftoken', document));
		authenticationAccountApi.allauthClientV1AuthLoginPost({
			client: 'browser',
			login: {
				username: username,
				password: password
			}
		}).then(() => {
			console.log('All good, redirect');
			goto('/learndle');
		}).catch((error: ErrorResponse) => {
			console.log(error);
		});

	}
</script>


<svelte:head>
	<title>Login</title>
	<meta name="description" content="Login form" />
</svelte:head>

<div class="text-column">
	<h1>Login</h1>

	<form on:submit={doLogin}>
		<label for="id_username"></label>
		<input type="text" id="id_username" name="username" placeholder="Username" bind:value={username} />
		<label for="id_password"></label>
		<input type="password" id="id_password" name="password" placeholder="Password" bind:value={password} />
		<button on:click={doLogin}>Login</button>
	</form>
</div>
