<script lang="ts">
	import { enhance } from '$app/forms';

	export let text: string;
	export let buttonValue: string;
	export let wordId: number | undefined = undefined;
	export let word: string | undefined = undefined;
	export let givenAnswer: string | undefined = undefined;
	export let answerWasCorrect: boolean | undefined = undefined;

	$: buttonColor = buttonValue !== givenAnswer ? 'btn-primary' : (answerWasCorrect ? 'btn-success' : 'btn-danger');
</script>

<form method="POST"
			action="?/answer"
			use:enhance>
	<button
		class="btn {buttonColor} answer_button d-flex align-items-center justify-content-center"
		name="answer"
		value="{buttonValue}">
		{text} - {buttonColor}
	</button>
	<input name="wordId" type="hidden" value="{wordId}">
	<input name="word" type="hidden" value="{word}">
</form>

<style>
    .answer_button {
        --bs-btn-font-size: 2rem;
        width: 200px;
        height: 100px;
    }
</style>