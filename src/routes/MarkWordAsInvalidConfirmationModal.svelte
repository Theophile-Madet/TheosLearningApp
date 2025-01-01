<script lang="ts">

	import { Modal, ModalBody, ModalFooter, ModalHeader } from '@sveltestrap/sveltestrap';
	import type { Word } from '../learning-dino-api-client';
	import DinoButton from '../components/DinoButton.svelte';

	interface Props {
		word: Word;
		isOpen: boolean;
		loading: boolean;
		onConfirm: () => void;
		onCancel: () => void;
	}

	let { word, isOpen, loading, onConfirm, onCancel }: Props = $props();
</script>

<Modal isOpen={isOpen} toggle={onCancel}>
	<ModalHeader>Confirm word is invalid?</ModalHeader>
	<ModalBody>
		<ul>
			<li>Word: {word.word}</li>
			<li>Gender: {word.gender}</li>
			<li>ID: {word.id}</li>
		</ul>
	</ModalBody>
	<ModalFooter>
		<DinoButton color="secondary" on:click={onCancel} text="Cancel" icon="x-circle" />
		<DinoButton color="danger" on:click={onConfirm} loading={loading} text="Mark as invalid" icon="bookmark-x" />
	</ModalFooter>
</Modal>
