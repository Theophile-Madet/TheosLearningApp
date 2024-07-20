<script lang="ts">
	import { Button, Col, Container, Row } from '@sveltestrap/sveltestrap';
	import AnswerButton from './AnswerButton.svelte';
	import type { PageData } from '../../.svelte-kit/types/src/routes/learndle/$types';
	import { useLearningDinoApi } from '../utils/useLearningDinoApi';
	import MarkWordAsInvalidConfirmationModal from './MarkWordAsInvalidConfirmationModal.svelte';
	import { hasAnswered } from './stores';
	import { getCookieValue } from '../utils/getCookieValue';
	import { LearningApi } from '../learning-dino-api-client';
	import AnswerWasWrongConfirmationModal from './AnswerWasWrongConfirmationModal.svelte';

	export let data: PageData;

	let markInvalidModalOpen = false;
	const textValuePairs: { [id: string]: string } = { 'Der': 'm', 'Die': 'f', 'Das': 'n', 'Plural': '0' };

	async function sendAnswer(event: CustomEvent) {
		if (!data.wordToGuess) return;

		const learningApi = useLearningDinoApi(LearningApi, fetch, getCookieValue('csrftoken', document));
		$hasAnswered = true;
		await learningApi.learningApiSendAnswerCreate({
			sendAnswerRequest: {
				wordId: data.wordToGuess.id,
				answer: event.detail.value
			}
		});
	}

	async function fetchNextWord() {
		const learningApi = useLearningDinoApi(LearningApi);
		data.wordToGuess = await learningApi.learningApiGetNextWordRetrieve();
		$hasAnswered = false;
	}

	async function markWordAsInvalid() {
		if (!data.wordToGuess) return;

		const learningApi = useLearningDinoApi(LearningApi, fetch, getCookieValue('csrftoken', document));
		await learningApi.learningApiMarkWordAsInvalidCreate({
				markWordAsInvalidRequest: {
					wordId: data.wordToGuess.id
				}
			}
		);

		markInvalidModalOpen = false;
		await fetchNextWord();
	}

	async function markAnswerAsWrong() {
		if (!data.wordToGuess) return;

		const learningApi = useLearningDinoApi(LearningApi, fetch, getCookieValue('csrftoken', document));
		await learningApi.learningApiMarkAnswerAsWrongCreate({
				markAnswerAsWrongRequest: {
					wordId: data.wordToGuess.id
				}
			}
		);

		markInvalidModalOpen = false;
		await fetchNextWord();
	}
</script>

<svelte:head>
	<title>Learndle</title>
	<meta name="description" content="Learndle" />
</svelte:head>

<Container>
	<Row class="mb-5">
		<Col>
			{#if data.wordToGuess}
				<h1>Welche Artikel hat {data.wordToGuess.word}?</h1>
			{/if}
		</Col>
	</Row>
	<Row class="mb-4">
		<Col class="d-flex align-items-center justify-content-center gap-3 flex-wrap">
			{#each Object.entries(textValuePairs) as [text, value]}
				<AnswerButton text="{text}" word="{data.wordToGuess}" buttonValue="{value}"
											on:sendAnswer={sendAnswer} />
			{/each}
		</Col>
	</Row>
	<Row class="mb-4">
		<Col class="d-flex justify-content-center gap-3">
			<Button class="d-flex align-items-center justify-content-center"
							color="danger"
							outline="{true}"
							on:click={() => {markInvalidModalOpen = true;}}>
				That is not a valid word
			</Button>
			<Button class="d-flex align-items-center justify-content-center"
							color="warning"
							outline="{true}"
							on:click={() => {markInvalidModalOpen = true;}}>
				The answer was wrong
			</Button>
			<Button class="d-flex align-items-center justify-content-center"
							color="secondary"
							outline="{!$hasAnswered}"
							on:click={fetchNextWord}>
				Next word
			</Button>
		</Col>
	</Row>
	{#if data.wordToGuess}
		<MarkWordAsInvalidConfirmationModal word="{data.wordToGuess}" isOpen="{markInvalidModalOpen}"
																				on:confirm={markWordAsInvalid} />
		<AnswerWasWrongConfirmationModal word="{data.wordToGuess}" isOpen="{markInvalidModalOpen}"
																		 on:confirm={markAnswerAsWrong} />
	{/if}
</Container>

<style>
    h1 {
        text-align: center;
    }
</style>
