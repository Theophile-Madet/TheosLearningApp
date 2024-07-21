<script lang="ts">
	import { useLearningDinoApi } from '../../utils/useLearningDinoApi';
	import { LearningApi } from '../../learning-dino-api-client';
	import { AuthenticationAccountApi } from '../../allauth-api-client';
	import { useAllauthApi } from '../../utils/useAllauthApi';
	import { goto } from '$app/navigation';
	import { Alert, Button, Container, FormGroup, Input } from '@sveltestrap/sveltestrap';
	import { onMount } from 'svelte';
	import { csrfToken } from '../stores';

	let username = '';
	let password = '';

	let loginError = '';

	onMount(async () => {
		if ($csrfToken) return;

		const learningApi = useLearningDinoApi(LearningApi);
		const token = await learningApi.learningApiGetCsrfTokenRetrieve();
		$csrfToken = token.csrfToken;
	});

	async function doLogin() {
		const authenticationAccountApi = useAllauthApi(AuthenticationAccountApi, fetch, $csrfToken);
		authenticationAccountApi.allauthClientV1AuthLoginPost({
			client: 'browser',
			login: {
				username: username,
				password: password
			}
		}).then(() => {
			goto('/');
		}).catch(async (errorResponse) => {
			const errorContent = await errorResponse.response.json();
			loginError = errorContent.errors.map((error: any) => error.message).join('\n');
		});
	}
</script>


<svelte:head>
	<title>Login</title>
	<meta name="description" content="Login form" />
</svelte:head>

<Container>
	<h1>Login</h1>

	<div class="dino-login-form">
		<form on:submit|preventDefault={doLogin}>
			{#if loginError}
				<Alert color="warning"> {loginError}</Alert>
			{/if}
			<FormGroup floating label="Username">
				<Input type="text" name="username" bind:value={username} />
			</FormGroup>
			<FormGroup floating label="Password">
				<Input type="password" name="password" bind:value={password} />
			</FormGroup>
			<div class="button-center">
				<Button color="primary" type="submit">Login</Button>
			</div>

		</form>
	</div>
</Container>

<style>
    h1 {
        text-align: center;
        margin-bottom: 3vh;
    }

    .dino-login-form {
        display: flex;
        justify-content: center;
    }

    .button-center {
        display: flex;
        justify-content: center;
    }
</style>
