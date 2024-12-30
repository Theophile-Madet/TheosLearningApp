<script lang="ts">

	import { csrfToken, hasAnswered } from './stores';
	import { LearningApi, type PokemonNameQuestionContent } from '../learning-dino-api-client';
	import { Col, Form, Input, Row, Toast, ToastBody, ToastHeader } from '@sveltestrap/sveltestrap';
	import { createEventDispatcher } from 'svelte';
	import DinoButton from '../components/DinoButton.svelte';
	import { useLearningDinoApi } from '../utils/useLearningDinoApi';
	import { getToastBody, getToastColor } from '../utils/toastUtils';

	export let questionContent: PokemonNameQuestionContent;

	const dispatch = createEventDispatcher();
	let inputValue = '';
	let answerWasCorrect = false;
	let toasts: { pokemonName: string, language: string, open: boolean, bodyText: string, color: string }[] = [];

	function sendAnswer() {
		$hasAnswered = true;
		answerWasCorrect = inputValue === questionContent.expectedName;

		const learningApi = useLearningDinoApi(LearningApi, fetch, $csrfToken);
		learningApi.learningApiSendAnswerPokemonNameCreate({
			sendAnswerPokemonNameRequest: {
				pokemonId: questionContent.pokemonId,
				answer: inputValue,
				expectedLanguageId: questionContent.expectedLanguageId,
				givenLanguageId: questionContent.givenLanguageId
			}
		}).then((result) => {
			toasts = [{
				pokemonName: questionContent.expectedName,
				language: questionContent.expectedLanguageName,
				bodyText: getToastBody(result.wasCorrectExpectedLanguage),
				open: true,
				color: getToastColor(result.wasCorrectExpectedLanguage)
			}, ...toasts];
			if (result.wasCorrectGivenLanguage?.correct) {
				toasts = [{
					pokemonName: questionContent.givenName,
					language: questionContent.givenLanguageName,
					bodyText: getToastBody(result.wasCorrectGivenLanguage),
					open: true,
					color: getToastColor(result.wasCorrectGivenLanguage)
				}, ...toasts];
			}
		}).catch((err: Error) => {
			alert('Not implemented must do catch ' + err);
		});

	}

	function nextQuestion() {
		dispatch('fetchNextQuestion');
	}
</script>

<Row class="mb-5">
	<Col>
		<h1>How is {questionContent.givenName} ({questionContent.givenLanguageName}) called
			in {questionContent.expectedLanguageName}?</h1>
	</Col>
</Row>
<Row class="mb-4">
	<Col>
		<Form on:submit={sendAnswer} class="d-flex align-items-center justify-content-center gap-3 flex-wrap flex-row">
			<div>
				<Input valid="{$hasAnswered && answerWasCorrect}" invalid="{$hasAnswered && !answerWasCorrect}"
							 placeholder="Answer" disabled={$hasAnswered}
							 bind:value={inputValue} autofocus />
			</div>
			<DinoButton text="Send" color="primary" on:click={sendAnswer} disabled={$hasAnswered} />
		</Form>
	</Col>
</Row>
{#if $hasAnswered}
	<Row class="mb-4">
		<Col class="d-flex align-items-center justify-content-center gap-3 flex-wrap flex-row">
			<h4>
				{#if answerWasCorrect}Correct!{:else}Wrong!{/if} {questionContent.givenName}'s
				name in {questionContent.expectedLanguageName}
				is {questionContent.expectedName}</h4>
		</Col>
	</Row>
{/if}
<Row class="mb-4">
	<Col class="d-flex align-items-center justify-content-center gap-3 flex-wrap flex-row">
		<DinoButton text="Next question" disabled="{!$hasAnswered}" outline="{!$hasAnswered}" color="secondary"
								on:click={nextQuestion} />
	</Col>
</Row>
<div class="toast-container top-0 end-0 p-3">
	{#each toasts as toast (toast.pokemonName + toast.language)}
		<Toast class="text-bg-{toast.color}" isOpen="{toast.open}" fade="{true}" autohide
					 on:close={() => {toasts = toasts.filter(otherToast => otherToast.pokemonName !== toast.pokemonName || otherToast.language !== toast.language)}}
					 delay="{3000}">
			<ToastHeader toggle="{() => toast.open = false}">{toast.pokemonName} ({toast.language})</ToastHeader>
			<ToastBody>{toast.bodyText}</ToastBody>
		</Toast>
	{/each}
</div>

<style>
    h1 {
        text-align: center;
    }
</style>