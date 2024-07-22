<script lang="ts">
	import { Alert, Col, Container, Row, Spinner, Toast, ToastBody, ToastHeader } from '@sveltestrap/sveltestrap';
	import AnswerButton from './AnswerButton.svelte';
	import { useLearningDinoApi } from '../utils/useLearningDinoApi';
	import MarkWordAsInvalidConfirmationModal from './MarkWordAsInvalidConfirmationModal.svelte';
	import { csrfToken, hasAnswered } from './stores';
	import { LearningApi, ResponseError, type WasAnswerCorrect, type Word } from '../learning-dino-api-client';
	import AnswerWasWrongConfirmationModal from './AnswerWasWrongConfirmationModal.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import DinoButton from '../components/DinoButton.svelte';
	import { useAllauthApi } from '../utils/useAllauthApi';
	import { AuthenticationCurrentSessionApi } from '../allauth-api-client';
	import AboutModal from './AboutModal.svelte';

	let markInvalidModalOpen = false;
	let markInvalidLoading = false;
	let markAnswerWrongModalOpen = false;
	let markAnswerWrongLoading = false;
	let aboutModalOpen = false;
	let apiError = '';
	let currentWord: Word | undefined;
	let rank: number | undefined;
	let nbAnswersTotal: number | undefined;
	let nbAnswersCorrect: number | undefined;
	let nbAnswersCorrectInARow: number | undefined;
	let loadingNextWord = false;
	let logoutLoading = false;
	const textValuePairs: { [id: string]: string } = { 'Der': 'm', 'Die': 'f', 'Das': 'n', 'Plural': '0' };

	let toasts: { word: Word, open: boolean, bodyText: string, color: string }[] = [];

	let small_positive_header = ['Nice!', 'Good!', 'Correct!', 'Yes!'];
	let big_positive_header = ['Well done!', 'Yeah!', 'Woohoo!'];
	let negative_header = ['Whoops!', 'Nope!', 'Maybe next time...'];

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
		const result = await learningApi.learningApiSendAnswerCreate({
			sendAnswerRequest: {
				wordId: currentWord.id,
				answer: event.detail.value
			}
		});
		toasts = [{
			word: currentWord,
			bodyText: getToastBody(result),
			open: true,
			color: getToastColor(result)
		}, ...toasts];
	}

	function getToastColor(result: WasAnswerCorrect) {
		if (result.learned) return 'success';
		if (result.correct) return 'light';
		return 'warning';
	}

	function getToastBody(result: WasAnswerCorrect) {
		if (result.learned) return getRandomElement(big_positive_header);
		if (result.correct) return getRandomElement(small_positive_header) + ' ' + result.nbAnswersCorrectInARow + '/' + result.repetitionsToLearn;
		return getRandomElement(negative_header);
	}

	async function fetchNextWord() {
		const learningApi = useLearningDinoApi(LearningApi);
		apiError = '';
		loadingNextWord = true;

		await learningApi.learningApiGetNextWordRetrieve().then((result) => {
			currentWord = result.word;
			rank = result.rank;
			nbAnswersTotal = result.nbAnswersTotal;
			nbAnswersCorrect = result.nbAnswersCorrect;
			nbAnswersCorrectInARow = result.nbAnswersCorrectInARow;
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
			apiError = errorContent.errors.map((error: any) => error.message).join('\n');
		}).finally(() => {
			logoutLoading = false;
		});
	}

	function getRandomElement(array: any[]) {
		return array[Math.floor(Math.random() * array.length)];
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
		<Row class="mb-5">
			<Col>
				<p class="text-center">
					{currentWord.word} is the {rank}th most used noun.
				</p>
				<p class="text-center">
					You've been correct {nbAnswersCorrect} out of {nbAnswersTotal} times in total. You've been
					correct {nbAnswersCorrectInARow} times in a row.
				</p>
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
		<MarkWordAsInvalidConfirmationModal word="{currentWord}" isOpen="{markInvalidModalOpen}"
																				on:confirm={markWordAsInvalid}
																				on:cancel={() => {markInvalidModalOpen = false;}}
																				loading="{markInvalidLoading}" />
		<AnswerWasWrongConfirmationModal word="{currentWord}" isOpen="{markAnswerWrongModalOpen}"
																		 on:confirm={markAnswerAsWrong}
																		 on:cancel={() => {markAnswerWrongModalOpen = false;}} />
	{/if}
	<AboutModal isOpen="{aboutModalOpen}" on:cancel={() => {aboutModalOpen = false;}} />
	<div class="toast-container top-0 end-0 p-3">
		{#each toasts as toast (toast.word.id)}
			<Toast class="text-bg-{toast.color}" isOpen="{toast.open}" fade="{true}" autohide
						 on:close={() => {toasts = toasts.filter(otherToast => otherToast.word.id !== toast.word.id)}}
						 delay="{1500}">
				<ToastHeader toggle="{() => toast.open = false}">{toast.word.word}</ToastHeader>
				<ToastBody>{toast.bodyText}</ToastBody>
			</Toast>
		{/each}
	</div>
</Container>

<style>
    h1 {
        text-align: center;
    }
</style>
