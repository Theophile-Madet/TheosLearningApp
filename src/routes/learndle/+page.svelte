<script lang="ts">
	import PageData = App.PageData;
	import { Col, Container, Row } from '@sveltestrap/sveltestrap';

	export let data: PageData;

	const answerButtonClasses =
		'btn btn-primary answer_button d-flex align-items-center justify-content-center';
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
			<div class={answerButtonClasses}>
				<div class="align-middle">Der</div>
			</div>
			<div class={answerButtonClasses}>
				<div>Die</div>
			</div>
			<div class={answerButtonClasses}>
				<div>Das</div>
			</div>
			<div class={answerButtonClasses}>
				<div>Plural</div>
			</div>
		</Col>
	</Row>
</Container>

<style>
    .answer_button {
        --bs-btn-font-size: 2rem;
        width: 200px;
        height: 100px;
    }
</style>
