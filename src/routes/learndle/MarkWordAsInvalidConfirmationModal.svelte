<script lang="ts">

	import { createEventDispatcher } from 'svelte';
	import type { Word } from '../../api-client';
	import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from '@sveltestrap/sveltestrap';

	export let word: Word;
	export let isOpen: boolean;
	const dispatch = createEventDispatcher();

	function confirm() {
		dispatch('confirm');
	}

	function close() {
		isOpen = false;
	}
</script>

<Modal isOpen={isOpen}>
	<ModalHeader>Confirm word is invalid?</ModalHeader>
	<ModalBody>{word.word} - {word.gender} - {word.id}</ModalBody>
	<ModalFooter>
		<Button color="secondary" on:click={close}>Cancel</Button>
		<Button color="danger" on:click={confirm}>Mark as invalid</Button>
	</ModalFooter>
</Modal>
