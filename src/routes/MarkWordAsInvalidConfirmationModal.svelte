<script lang="ts">

	import { createEventDispatcher } from 'svelte';
	import { Modal, ModalBody, ModalFooter, ModalHeader } from '@sveltestrap/sveltestrap';
	import type { Word } from '../learning-dino-api-client';
	import DinoButton from '../components/DinoButton.svelte';

	interface Props {
		word: Word;
		isOpen: boolean;
		loading: boolean;
	}

	let { word, isOpen, loading }: Props = $props();
	const dispatch = createEventDispatcher();

	function confirm() {
		dispatch('confirm');
	}

	function cancel() {
		dispatch('cancel');
	}
</script>

<Modal isOpen={isOpen} toggle="{() => {cancel()}}">
	<ModalHeader>Confirm word is invalid?</ModalHeader>
	<ModalBody>
		<ul>
			<li>Word: {word.word}</li>
			<li>Gender: {word.gender}</li>
			<li>ID: {word.id}</li>
		</ul>
	</ModalBody>
	<ModalFooter>
		<DinoButton color="secondary" on:click={cancel} text="Cancel" icon="x-circle" />
		<DinoButton color="danger" on:click={confirm} loading="{loading}" text="Mark as invalid" icon="bookmark-x" />
	</ModalFooter>
</Modal>
