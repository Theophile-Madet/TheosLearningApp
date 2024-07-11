<script lang="ts">
	import PageData = App.PageData;
	import { Col, Container, Row } from '@sveltestrap/sveltestrap';
	import AnswerButton from './AnswerButton.svelte';
	import { enhance } from '$app/forms';

	export let data: PageData;

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
			<AnswerButton text="Der" answer="m" wordId="{data.wordToGuess.id}" />
			<AnswerButton text="Die" answer="f" wordId="{data.wordToGuess.id}" />
			<AnswerButton text="Das" answer="n" wordId="{data.wordToGuess.id}" />
			<AnswerButton text="Plural" answer="0" wordId="{data.wordToGuess.id}" />
		</Col>
	</Row>
	<Row class="mb-4">
		<Col class="d-flex justify-content-center">
			<form method="POST"
						action="?/markWordAsInvalid"
						use:enhance>
				<button class="btn btn-outline-danger btn-sm d-flex align-items-center justify-content-center">
					Mark word as invalid
				</button>
				<input name="wordId" type="hidden" value="{data.wordToGuess.id}">
			</form>
		</Col>
	</Row>
</Container>
