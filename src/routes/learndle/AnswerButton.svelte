<script lang="ts">

	import { createEventDispatcher } from 'svelte';
	import type { Word } from '../../api-client';

	export let text: string;
	export let word: Word;
	export let buttonValue: string;
	export let answerGiven: boolean;
	$: localGiven = answerGiven;

	let clicked = false;

	let buttonColor = 'btn-primary';
	$: if (localGiven) {
		if (buttonValue == word.gender) {
			buttonColor = 'btn-success';
		} else if (clicked) {
			buttonColor = 'btn-danger';
		}
	}

	const dispatch = createEventDispatcher();

	function sendAnswer() {
		clicked = true;
		dispatch('sendAnswer', {
			value: buttonValue
		});
	}
</script>

<button on:click={sendAnswer}
				class="btn {buttonColor} answer_button d-flex align-items-center justify-content-center"
				disabled="{localGiven}">
	{text}
</button>

<style>
    .answer_button {
        --bs-btn-font-size: 2rem;
        width: 200px;
        height: 100px;
    }
</style>