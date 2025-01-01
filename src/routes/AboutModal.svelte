<script lang="ts">

	import { Modal, ModalBody, ModalFooter, ModalHeader } from '@sveltestrap/sveltestrap';
	import DinoButton from '../components/DinoButton.svelte';

	interface Props {
		isOpen: boolean;
		onCancel: () => void;
	}

	let { isOpen, onCancel }: Props = $props();

</script>

<Modal isOpen={isOpen} toggle={onCancel} size="lg">
	<ModalHeader>About Learning Dino</ModalHeader>
	<ModalBody>
		<p>
			Learning Dino tries to teach the gender of german words. For that, it picks words from the list of most used
			words in german newspapers. The list is made by the Uni Leipzig <a
			href="https://wortschatz.uni-leipzig.de/en/download/German">here</a>, section "News", year 2023. The genders of
			the words are fetched from the <a href="https://de.wiktionary.org/wiki/Wiktionary:Hauptseite">Wiktionary</a>, that
			makes dumps available <a href="https://dumps.wikimedia.org/dewiktionary/latest/">here</a>.
		</p>
		<p>
			Once a word has appeared, it won't appear to you again in the next few hours. If you get the answer right 7 times
			in a row, the word is considered learned and won't appear again.
		</p>
		<p>
			Learning Dino is made by <a href="https://seriousdino.org/">Serious Dino</a> aka Théophile Madet, using Django and
			SvelteKit. You can check the source code on <a
			href="https://github.com/Theophile-Madet/TheosLearningApp">GitHub</a>.
		</p>
	</ModalBody>
	<ModalFooter>
		<DinoButton color="secondary" on:click={onCancel} text="Close" icon="x-circle" />
	</ModalFooter>
</Modal>
