<script lang="ts">
	import { Button, Col, Container, Row } from '@sveltestrap/sveltestrap';
	import AnswerButton from './AnswerButton.svelte';
	import { useLearningDinoApi } from '../utils/useLearningDinoApi';
	import MarkWordAsInvalidConfirmationModal from './MarkWordAsInvalidConfirmationModal.svelte';
	import { hasAnswered } from './stores';
	import { getCookieValue } from '../utils/getCookieValue';
	import { LearningApi, type Word } from '../learning-dino-api-client';
	import AnswerWasWrongConfirmationModal from './AnswerWasWrongConfirmationModal.svelte';
	import { onMount } from 'svelte';


	let markInvalidModalOpen = false;
	const textValuePairs: { [id: string]: string } = { 'Der': 'm', 'Die': 'f', 'Das': 'n', 'Plural': '0' };

	let currentWord: Word | undefined = undefined;

	onMount(() => {
		fetchNextWord();
	});

	async function sendAnswer(event: CustomEvent) {
		if (!currentWord) return;

		const learningApi = useLearningDinoApi(LearningApi, fetch, getCookieValue('csrftoken', document));
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
		currentWord = await learningApi.learningApiGetNextWordRetrieve();
		$hasAnswered = false;
	}

	async function markWordAsInvalid() {
		if (!currentWord) return;

		const learningApi = useLearningDinoApi(LearningApi, fetch, getCookieValue('csrftoken', document));
		await learningApi.learningApiMarkWordAsInvalidCreate({
				markWordAsInvalidRequest: {
					wordId: currentWord.id
				}
			}
		);

		markInvalidModalOpen = false;
		await fetchNextWord();
	}

	async function markAnswerAsWrong() {
		if (!currentWord) return;

		const learningApi = useLearningDinoApi(LearningApi, fetch, getCookieValue('csrftoken', document));
		await learningApi.learningApiMarkAnswerAsWrongCreate({
				markAnswerAsWrongRequest: {
					wordId: currentWord.id
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
			{#if currentWord}
				<h1>Welche Artikel hat {currentWord.word}?</h1>
			{/if}
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
	{#if currentWord}
		<MarkWordAsInvalidConfirmationModal word="{currentWord}" isOpen="{markInvalidModalOpen}"
																				on:confirm={markWordAsInvalid} />
		<AnswerWasWrongConfirmationModal word="{currentWord}" isOpen="{markInvalidModalOpen}"
																		 on:confirm={markAnswerAsWrong} />
	{/if}
</Container>

<style>
    h1 {
        text-align: center;
    }
</style>
