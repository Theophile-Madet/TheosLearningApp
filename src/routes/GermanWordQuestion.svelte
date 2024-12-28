<script lang="ts">

	import { apiError, csrfToken, hasAnswered } from './stores';
	import { LearningApi, ResponseError, type WasAnswerCorrect, type Word } from '../learning-dino-api-client';
	import { useLearningDinoApi } from '../utils/useLearningDinoApi';
	import AnswerWasWrongConfirmationModal from './AnswerWasWrongConfirmationModal.svelte';
	import DinoButton from '../components/DinoButton.svelte';
	import AnswerButton from './AnswerButton.svelte';
	import MarkWordAsInvalidConfirmationModal from './MarkWordAsInvalidConfirmationModal.svelte';
	import { Col, Row, Toast, ToastBody, ToastHeader } from '@sveltestrap/sveltestrap';
	import { createEventDispatcher } from 'svelte';

	export let word: Word;
	export let rank: number;

	let toasts: { word: Word, open: boolean, bodyText: string, color: string }[] = [];
	let markInvalidModalOpen = false;
	let markInvalidLoading = false;
	let markAnswerWrongModalOpen = false;
	let markAnswerWrongLoading = false;

	const dispatch = createEventDispatcher();

	const textValuePairs: { [id: string]: string } = { 'Der': 'm', 'Die': 'f', 'Das': 'n', 'Plural': '0' };
	let small_positive_header = ['Nice!', 'Good!', 'Correct!', 'Yes!'];
	let big_positive_header = ['Well done!', 'Yeah!', 'Woohoo!'];
	let negative_header = ['Whoops!', 'Nope!', 'Maybe next time...'];

	function getRandomElement(array: any[]) {
		return array[Math.floor(Math.random() * array.length)];
	}

	async function sendAnswer(event: CustomEvent) {
		const learningApi = useLearningDinoApi(LearningApi, fetch, $csrfToken);
		$hasAnswered = true;
		const result = await learningApi.learningApiSendAnswerCreate({
			sendAnswerRequest: {
				wordId: word.id,
				answer: event.detail.value
			}
		});
		toasts = [{
			word: word,
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

	async function markWordAsInvalid() {
		const learningApi = useLearningDinoApi(LearningApi, fetch, $csrfToken);
		$apiError = '';
		markInvalidLoading = true;

		learningApi.learningApiMarkWordAsInvalidCreate({
				markWordAsInvalidRequest: {
					wordId: word.id
				}
			}
		).then(() => {
			dispatch('fetchNextQuestion');
		}).catch(async (error: ResponseError) => {
			const errorContent = await error.response.json();
			$apiError = errorContent.errors.map((error: any) => error.message).join('\n');
		}).finally(() => {
			markInvalidModalOpen = false;
			markInvalidLoading = false;
		});
	}

	async function markAnswerAsWrong() {
		const learningApi = useLearningDinoApi(LearningApi, fetch, $csrfToken);
		$apiError = '';
		markAnswerWrongLoading = true;

		learningApi.learningApiMarkAnswerAsWrongCreate({
				markAnswerAsWrongRequest: {
					wordId: word.id
				}
			}
		).then(async () => {
			markAnswerWrongModalOpen = false;
			dispatch('fetchNextQuestion');
		}).catch(async (error: ResponseError) => {
			const errorContent = await error.response.json();
			$apiError = errorContent.errors.map((error: any) => error.message).join('\n');
		}).finally(() => {
			markAnswerWrongLoading = false;
		});
	}
</script>

<Row class="mb-5">
	<Col>
		<h1>Welche Artikel hat {word.word}?</h1>
	</Col>
</Row>
<Row class="mb-4">
	<Col class="d-flex align-items-center justify-content-center gap-3 flex-wrap">
		{#each Object.entries(textValuePairs) as [text, value]}
			<AnswerButton text="{text}" word="{word}" buttonValue="{value}"
										on:sendAnswer={sendAnswer} />
		{/each}
	</Col>
</Row>
<Row class="mb-5">
	<Col>
		<p class="text-center">
			{word.word} is the {rank}th most used noun.
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
			on:click={() => {dispatch("fetchNextQuestion")}} text="Next question">
		</DinoButton>
	</Col>
</Row>
<MarkWordAsInvalidConfirmationModal word="{word}" isOpen="{markInvalidModalOpen}"
																		on:confirm={markWordAsInvalid}
																		on:cancel={() => {markInvalidModalOpen = false;}}
																		loading="{markInvalidLoading}" />
<AnswerWasWrongConfirmationModal word="{word}" isOpen="{markAnswerWrongModalOpen}"
																 on:confirm={markAnswerAsWrong}
																 on:cancel={() => {markAnswerWrongModalOpen = false;}} />
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

<style>
    h1 {
        text-align: center;
    }
</style>