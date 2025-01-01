<script lang="ts">

	import { createEventDispatcher } from 'svelte';
	import { hasAnswered } from './stores';
	import type { Word } from '../learning-dino-api-client';

	interface Props {
		text: string;
		word: Word;
		buttonValue: string;
	}

	let { text, word, buttonValue }: Props = $props();

	let buttonColor = $state('btn-primary');
	let clicked = false;

	function determineButtonColor(hasAnswered: Boolean) {
		if (hasAnswered) {
			if (buttonValue == word.gender) {
				return 'btn-success';
			}

			if (clicked) {
				return 'btn-danger';
			}
		}

		return 'btn-primary';
	}

	hasAnswered.subscribe((hasAnswered) => {
		if (!hasAnswered) {
			clicked = false;
		}

		buttonColor = determineButtonColor(hasAnswered);
	});

	const dispatch = createEventDispatcher();

	function sendAnswer() {
		clicked = true;
		dispatch('sendAnswer', {
			value: buttonValue
		});
	}
</script>

<button onclick={sendAnswer}
				class="btn {buttonColor} answer_button d-flex align-items-center justify-content-center"
				disabled="{$hasAnswered}">
	{text}
</button>

<style>
    .answer_button {
        --bs-btn-font-size: 2rem;
        width: 100%;
        max-width: 40%;
        min-width: 20%;
        height: 100px;
    }
</style>