<script lang="ts">

	import { hasAnswered } from './stores';
	import { type PokemonNameQuestionContent } from '../learning-dino-api-client';
	import { Col, Form, Input, Row } from '@sveltestrap/sveltestrap';
	import { createEventDispatcher } from 'svelte';
	import DinoButton from '../components/DinoButton.svelte';

	export let questionContent: PokemonNameQuestionContent;

	const dispatch = createEventDispatcher();
	let inputValue = '';
	let answerWasCorrect = false;

	function sendAnswer() {
		$hasAnswered = true;
		answerWasCorrect = inputValue === questionContent.expectedName;
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
				{#if answerWasCorrect}Correct!{:else}Wrong!{/if} {questionContent.givenName}
				's name in {questionContent.expectedLanguageName}
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


<style>
    h1 {
        text-align: center;
    }
</style>