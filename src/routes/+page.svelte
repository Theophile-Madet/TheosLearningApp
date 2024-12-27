<script lang="ts">
	import { Alert, Col, Container, Row, Spinner } from '@sveltestrap/sveltestrap';
	import { useLearningDinoApi } from '../utils/useLearningDinoApi';
	import { apiError, csrfToken, hasAnswered } from './stores';
	import {
		type GermanWordQuestionContent,
		LearningApi,
		type PokemonNameQuestionContent,
		type QuestionStats,
		QuestionTypeEnum,
		ResponseError
	} from '../learning-dino-api-client';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { useAllauthApi } from '../utils/useAllauthApi';
	import { AuthenticationCurrentSessionApi } from '../allauth-api-client';
	import AboutModal from './AboutModal.svelte';
	import GermanWordQuestion from './GermanWordQuestion.svelte';
	import DinoButton from '../components/DinoButton.svelte';
	import PokemonNameQuestion from './PokemonNameQuestion.svelte';


	let aboutModalOpen = false;

	let questionType: QuestionTypeEnum | undefined;
	let germanWordQuestionContent: GermanWordQuestionContent | undefined;
	let pokemonNameQuestionContent: PokemonNameQuestionContent | undefined;
	let questionStats: QuestionStats | undefined;
	let logoutLoading = false;


	onMount(async () => {
		if (!$csrfToken) {
			const learningApi = useLearningDinoApi(LearningApi);
			const token = await learningApi.learningApiGetCsrfTokenRetrieve();
			$csrfToken = token.csrfToken;
		}

		await fetchNextQuestion();
	});


	async function fetchNextQuestion() {
		const learningApi = useLearningDinoApi(LearningApi);
		$apiError = '';
		questionType = undefined;
		germanWordQuestionContent = undefined;
		pokemonNameQuestionContent = undefined;
		questionStats = undefined;

		await learningApi.learningApiGetNextQuestionRetrieve().then((result) => {
			questionType = result.questionType;

			switch (result.questionType) {
				case QuestionTypeEnum.GermanWord:
					if (!result.germanWordContent) {
						console.error('Missing question content for german word');
						console.log(result);
						break;
					}
					germanWordQuestionContent = result.germanWordContent;
					break;
				case QuestionTypeEnum.PokemonName:
					if (!result.pokemonNameContent) {
						console.error('Missing question content for pokemon name');
						console.log(result);
						break;
					}
					pokemonNameQuestionContent = result.pokemonNameContent;
			}

			questionStats = result.stats;
			$hasAnswered = false;
		}).catch(async (error: ResponseError) => {
			if (error.response.status === 403) {
				await goto('/login');
				return;
			}
			const errorContent = await error.response.json();
			$apiError = errorContent.errors.map((error: any) => error.message).join('\n');
		});
	}


	async function logout() {
		logoutLoading = true;

		const learningApi = useLearningDinoApi(LearningApi);
		const token = await learningApi.learningApiGetCsrfTokenRetrieve();
		$csrfToken = token.csrfToken;

		const authenticationAccountApi = useAllauthApi(AuthenticationCurrentSessionApi, fetch, $csrfToken);
		authenticationAccountApi.allauthClientV1AuthSessionDelete({
			client: 'browser'
		}).then(async () => {
			await goto('/login');
		}).catch(async (error: ResponseError) => {
			if (error.response.status === 401) { //401 means the logout was successful
				await goto('/login');
				return;
			}

			const errorContent = await error.response.json();
			$apiError = errorContent.errors.map((error: any) => error.message).join('\n');
		}).finally(() => {
			logoutLoading = false;
		});
	}


</script>

<svelte:head>
	<title>Learning Dino</title>
	<meta name="description" content="Learning Dino" />
</svelte:head>

<Container>
	{#if $apiError}
		<Row class="mb-5">
			<Alert color="warning">{$apiError}</Alert>
		</Row>
	{/if}
	{#if !$apiError && !questionType}
		<Row class="mb-5 d-flex justify-content-center">
			<Spinner type="border" color="secondary" />
		</Row>
	{/if}
	{#if questionType}
		{#if questionType === QuestionTypeEnum.GermanWord}
			{#if !germanWordQuestionContent}
				<div>Failed to load question content for german word</div>
			{:else}
				<GermanWordQuestion word="{germanWordQuestionContent.word}" rank="{germanWordQuestionContent.rank}"
														on:fetchNextQuestion="{fetchNextQuestion}" />
			{/if}
		{/if}
		{#if questionType === QuestionTypeEnum.PokemonName}
			{#if !pokemonNameQuestionContent}
				<div>Failed to load question content for pokemon name</div>
			{:else}
				<PokemonNameQuestion questionContent="{pokemonNameQuestionContent}"
														 on:fetchNextQuestion="{fetchNextQuestion}" />
			{/if}
		{/if}
		{#if questionStats}
			<Row class="mb-5">
				<Col>
					<p class="text-center">
						You've been correct {questionStats.nbAnswersCorrect} out of {questionStats.nbAnswersTotal} times in total.
						You've been
						correct {questionStats.nbAnswersCorrectInARow} times in a row.
					</p>
				</Col>
			</Row>
		{/if}
	{/if}
	<Row class="mb-4">
		<Col class="d-flex justify-content-center gap-3">
			<DinoButton
				color="secondary"
				outline="{true}"
				on:click={() => {aboutModalOpen = true;}} text="About" icon="question-circle" loading="{logoutLoading}">
			</DinoButton>
			<DinoButton
				color="secondary"
				outline="{true}"
				on:click={logout} text="Logout" icon="door-open" loading="{logoutLoading}">
			</DinoButton>
		</Col>
	</Row>
	<AboutModal isOpen="{aboutModalOpen}" on:cancel={() => {aboutModalOpen = false;}} />
</Container>


