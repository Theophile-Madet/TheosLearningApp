<script lang="ts">
	import { Modal, ModalBody, ModalFooter, ModalHeader } from '@sveltestrap/sveltestrap';
	import type { Word } from '../learning-dino-api-client';
	import DinoButton from '../components/DinoButton.svelte';

	interface Props {
		word: Word;
		isOpen: boolean;
		onConfirm: () => void;
		onCancel: () => void;
	}

	let { word, isOpen, onConfirm, onCancel }: Props = $props();
</script>

<Modal isOpen={isOpen} toggle={onCancel}>
	<ModalHeader>Confirm answer was wrong?</ModalHeader>
	<ModalBody>
		<ul>
			<li>Word: {word.word}</li>
			<li>Gender: {word.gender}</li>
			<li>ID: {word.id}</li>
		</ul>
	</ModalBody>
	<ModalFooter>
		<DinoButton color="secondary" on:click={onCancel} text="Actually it was correct" icon="x-circle" />
		<DinoButton color="danger" on:click={onConfirm} text="Yes it was wrong" icon="bug" />
	</ModalFooter>
</Modal>
