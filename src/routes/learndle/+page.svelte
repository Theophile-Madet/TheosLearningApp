<script lang="ts">
	import { Col, Container, Row } from '@sveltestrap/sveltestrap';
	import AnswerButton from './AnswerButton.svelte';
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from '../../../.svelte-kit/types/src/routes/learndle/$types';

	export let data: PageData;
	export let form: ActionData;

	const textValuePairs: { [id: string]: string } = { 'Der': 'm', 'Die': 'f', 'Das': 'n', 'Plural': '0' };
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
			{#each Object.entries(textValuePairs) as [text, value]}
				<AnswerButton text="{text}" buttonValue="{value}"
											wordId="{data.wordToGuess.id}"
											word="{data.wordToGuess.word}" />
			{/each}
		</Col>
	</Row>
	<Row class="mb-4">
		<Col class="d-flex justify-content-center">
			<form method="POST"
						action="/learndle?/markWordAsInvalid"
						use:enhance>
				<button class="btn btn-outline-danger btn-sm d-flex align-items-center justify-content-center">
					Mark word as invalid
				</button>
				<input name="wordId" type="hidden" value="{data.wordToGuess.id}">
			</form>
		</Col>
	</Row>
	{#if form?.lastWord}
		<Row class="mb-1">
			<Col>
				<h1>{form.lastWord}</h1>
			</Col>
		</Row>
		<Row class="mb-1">
			<Col class="d-flex align-items-center justify-content-center gap-3 flex-wrap">
				{#each Object.entries(textValuePairs) as [text, value]}
					<AnswerButton text="{text}" buttonValue="{value}"
												givenAnswer="{form?.givenAnswer}"
												answerWasCorrect="{form?.answerIsCorrect}" />
				{/each}
			</Col>
		</Row>
	{/if}
</Container>
