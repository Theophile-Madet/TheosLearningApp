<script lang="ts">
	import { enhance } from '$app/forms';

	export let text: string;
	export let answer: string;
	export let wordId: number;
</script>

<form method="POST"
			action="?/answer"
			use:enhance>
	<button class="btn btn-primary answer_button d-flex align-items-center justify-content-center"
					name="answer"
					value="{answer}">
		{text}
	</button>
	<input name="wordId" type="hidden" value="{wordId}">
</form>

<style>
    .answer_button {
        --bs-btn-font-size: 2rem;
        width: 200px;
        height: 100px;
    }
</style>