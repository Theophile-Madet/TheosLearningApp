<script lang="ts">
	import { Button, Col, Container, Row } from '@sveltestrap/sveltestrap';
	import AnswerButton from './AnswerButton.svelte';
	import type { PageData } from '../../../.svelte-kit/types/src/routes/learndle/$types';
	import { useApi } from '../../utils/useApi';
	import { LearningApi } from '../../api-client';
	import MarkWordAsInvalidConfirmationModal from './MarkWordAsInvalidConfirmationModal.svelte';

	export let data: PageData;

	let answerGiven = false;
	let markInvalidModalOpen = false;
	const textValuePairs: { [id: string]: string } = { 'Der': 'm', 'Die': 'f', 'Das': 'n', 'Plural': '0' };

	function getCookieValue(name: string) {
		return document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || '';
	}

	async function sendAnswer(event: CustomEvent) {
		const learningApi = useApi(LearningApi, fetch, getCookieValue('csrftoken'));
		answerGiven = true;
		await learningApi.learningApiSendAnswerCreate({
			sendAnswerRequest: {
				wordId: data.wordToGuess.id,
				answer: event.detail.value
			}
		});
	}

	async function fetchNextWord() {
		const learningApi = useApi(LearningApi);
		data.wordToGuess = await learningApi.learningApiGetNextWordRetrieve();
		answerGiven = false;
	}

	async function markWordAsInvalid() {
		const learningApi = useApi(LearningApi, fetch, getCookieValue('csrftoken'));
		await learningApi.learningApiMarkWordAsInvalidCreate({
				markWordAsInvalidRequest: {
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
			<h1>{data.wordToGuess.word}</h1>
		</Col>
	</Row>
	<Row class="mb-4">
		<Col class="d-flex align-items-center justify-content-center gap-3 flex-wrap">
			{#key answerGiven}
				{#each Object.entries(textValuePairs) as [text, value]}
					<AnswerButton text="{text}" word="{data.wordToGuess}" buttonValue="{value}" {answerGiven}
												on:sendAnswer={sendAnswer} />
				{/each}
			{/key}
		</Col>
	</Row>
	<Row class="mb-4">
		<Col class="d-flex justify-content-center gap-3">
			<Button class="d-flex align-items-center justify-content-center"
							color="danger"
							size="sm"
							outline="{true}"
							on:click={() => {markInvalidModalOpen = true;}}>
				Mark word as invalid
			</Button>
			<Button class="d-flex align-items-center justify-content-center"
							color="secondary"
							size="sm"
							outline="{true}"
							on:click={fetchNextWord}>
				Next word
			</Button>
		</Col>
	</Row>
	<MarkWordAsInvalidConfirmationModal word="{data.wordToGuess}" isOpen="{markInvalidModalOpen}"
																			on:confirm={markWordAsInvalid} />
</Container>
