<script lang="ts">

	import { type PokemonNameQuestionContent } from '../learning-dino-api-client';
	import { Col, Row } from '@sveltestrap/sveltestrap';
	import { createEventDispatcher } from 'svelte';

	export let questionContent: PokemonNameQuestionContent;

	const dispatch = createEventDispatcher();

</script>

<Row class="mb-5">
	<Col>
		<h1>This is a pokemon name question!</h1>
	</Col>
</Row>
<Row class="mb-4">
	<Col class="d-flex align-items-center justify-content-center gap-3 flex-wrap">
		<ul>
			<li>Pokemon ID : {questionContent.pokemonId}</li>
			<li>Given name : {questionContent.givenName}</li>
			<li>Given language ID : {questionContent.givenLanguageId}</li>
		</ul>
	</Col>
</Row>


<style>
    h1 {
        text-align: center;
    }
</style>