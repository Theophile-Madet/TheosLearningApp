<script lang="ts">
	import { Alert, Col, Container, Row, Spinner } from '@sveltestrap/sveltestrap';
	import AnswerButton from './AnswerButton.svelte';
	import { useLearningDinoApi } from '../utils/useLearningDinoApi';
	import MarkWordAsInvalidConfirmationModal from './MarkWordAsInvalidConfirmationModal.svelte';
	import { csrfToken, hasAnswered } from './stores';
	import { LearningApi, ResponseError, type Word } from '../learning-dino-api-client';
	import AnswerWasWrongConfirmationModal from './AnswerWasWrongConfirmationModal.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import DinoButton from '../components/DinoButton.svelte';

	let markInvalidModalOpen = false;
	let markInvalidLoading = false;
	let markAnswerWrongModalOpen = false;
	let markAnswerWrongLoading = false;
	let apiError = '';
	let currentWord: Word | undefined;
	let loadingNextWord = false;
	const textValuePairs: { [id: string]: string } = { 'Der': 'm', 'Die': 'f', 'Das': 'n', 'Plural': '0' };

	onMount(async () => {
		if (!$csrfToken) {
			const learningApi = useLearningDinoApi(LearningApi);
			const token = await learningApi.learningApiGetCsrfTokenRetrieve();
			$csrfToken = token.csrfToken;
		}

		await fetchNextWord();
	});

	async function sendAnswer(event: CustomEvent) {
		if (!currentWord) return;

		const learningApi = useLearningDinoApi(LearningApi, fetch, $csrfToken);
		$hasAnswered = true;
		await learningApi.learningApiSendAnswerCreate({
			sendAnswerRequest: {
				wordId: currentWord.id,
				answer: event.detail.value
			}
		});
	}

	async function fetchNextWord() {
		const learningApi = useLearningDinoApi(LearningApi);
		apiError = '';
		loadingNextWord = true;

		await learningApi.learningApiGetNextWordRetrieve().then((word) => {
			currentWord = word;
			$hasAnswered = false;
		}).catch(async (error: ResponseError) => {
			if (error.response.status === 403) {
				await goto('/login');
				return;
			}
			const errorContent = await error.response.json();
			apiError = errorContent.errors.map((error: any) => error.message).join('\n');
		}).finally(() => {
			loadingNextWord = false;
		});
	}

	async function markWordAsInvalid() {
		if (!currentWord) return;

		const learningApi = useLearningDinoApi(LearningApi, fetch, $csrfToken);
		apiError = '';
		markInvalidLoading = true;

		learningApi.learningApiMarkWordAsInvalidCreate({
				markWordAsInvalidRequest: {
					wordId: currentWord.id
				}
			}
		).then(async () => {
			await fetchNextWord();
		}).catch(async (error: ResponseError) => {
			const errorContent = await error.response.json();
			apiError = errorContent.errors.map((error: any) => error.message).join('\n');
		}).finally(() => {
			markInvalidModalOpen = false;
			markInvalidLoading = false;
		});
	}

	async function markAnswerAsWrong() {
		if (!currentWord) return;

		const learningApi = useLearningDinoApi(LearningApi, fetch, $csrfToken);
		apiError = '';
		markAnswerWrongLoading = true;

		learningApi.learningApiMarkAnswerAsWrongCreate({
				markAnswerAsWrongRequest: {
					wordId: currentWord.id
				}
			}
		).then(async () => {
			markAnswerWrongModalOpen = false;
			await fetchNextWord();
		}).catch(async (error: ResponseError) => {
			const errorContent = await error.response.json();
			apiError = errorContent.errors.map((error: any) => error.message).join('\n');
		}).finally(() => {
			markAnswerWrongLoading = false;
		});
	}
</script>

<svelte:head>
	<title>Learning Dino</title>
	<meta name="description" content="Learning Dino" />
</svelte:head>

<Container>
	{#if apiError}
		<Row class="mb-5">
			<Alert color="warning">{apiError}</Alert>
		</Row>
	{/if}
	{#if !apiError && !currentWord}
		<Row class="mb-5 d-flex justify-content-center">
			<Spinner type="border" color="secondary" />
		</Row>
	{/if}
	{#if currentWord}
		<Row class="mb-5">
			<Col>
				<h1>Welche Artikel hat {currentWord.word}?</h1>
			</Col>
		</Row>
		<Row class="mb-4">
			<Col class="d-flex align-items-center justify-content-center gap-3 flex-wrap">
				{#each Object.entries(textValuePairs) as [text, value]}
					<AnswerButton text="{text}" word="{currentWord}" buttonValue="{value}"
												on:sendAnswer={sendAnswer} />
				{/each}
			</Col>
		</Row>
		<Row class="mb-4">
			<Col class="d-flex justify-content-center gap-3">
				<DinoButton
					color="danger"
					outline="{true}"
					on:click={() => {markInvalidModalOpen = true;}}
					text="That is not a valid word"
					loading="{markInvalidLoading}"
					icon="cone-striped" />
				<DinoButton
					color="warning"
					outline="{true}"
					on:click={() => {markAnswerWrongModalOpen = true;}}
					text="The answer was wrong"
					loading="{markAnswerWrongLoading}"
					icon="cone-striped" />
				<DinoButton
					color="secondary"
					outline="{!$hasAnswered}"
					on:click={fetchNextWord} text="Next word" loading="{loadingNextWord}">
				</DinoButton>
			</Col>
		</Row>
		<MarkWordAsInvalidConfirmationModal word="{currentWord}" isOpen="{markInvalidModalOpen}"
																				on:confirm={markWordAsInvalid}
																				on:cancel={() => {markInvalidModalOpen = false;}}
																				loading="{markInvalidLoading}" />
		<AnswerWasWrongConfirmationModal word="{currentWord}" isOpen="{markAnswerWrongModalOpen}"
																		 on:confirm={markAnswerAsWrong}
																		 on:cancel={() => {markAnswerWrongModalOpen = false;}} />
	{/if}
</Container>

<style>
    h1 {
        text-align: center;
    }
</style>
