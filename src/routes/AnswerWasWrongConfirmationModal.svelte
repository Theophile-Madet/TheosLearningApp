<script lang="ts">

	import { createEventDispatcher } from 'svelte';
	import { Modal, ModalBody, ModalFooter, ModalHeader } from '@sveltestrap/sveltestrap';
	import type { Word } from '../learning-dino-api-client';
	import DinoButton from '../components/DinoButton.svelte';

	interface Props {
		word: Word;
		isOpen: boolean;
	}

	let { word, isOpen }: Props = $props();
	let loading: boolean;
	const dispatch = createEventDispatcher();

	function confirm() {
		dispatch('confirm');
	}

	function cancel() {
		dispatch('cancel');
	}
</script>

<Modal isOpen={isOpen} toggle="{() => {cancel()}}">
	<ModalHeader>Confirm answer was wrong?</ModalHeader>
	<ModalBody>
		<ul>
			<li>Word: {word.word}</li>
			<li>Gender: {word.gender}</li>
			<li>ID: {word.id}</li>
		</ul>
	</ModalBody>
	<ModalFooter>
		<DinoButton color="secondary" on:click={cancel} text="Actually it was correct" icon="x-circle" />
		<DinoButton color="danger" on:click={confirm} text="Yes it was wrong" icon="bug" loading="{loading}" />
	</ModalFooter>
</Modal>
