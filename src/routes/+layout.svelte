<script>
	import Header from './Header.svelte';
	import './styles.css';
	import { Styles } from '@sveltestrap/sveltestrap';

	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();
</script>

<div class="app">
	<Header />

	<main>
		{@render children?.()}
	</main>

	<footer>
		<p>
			Made by <a href="https://seriousdino.org/">Serious Dino</a>, check out the code on
			<a href="https://github.com/Theophile-Madet/TheosLearningApp">GitHub</a>
		</p>
	</footer>
</div>

<style>
    .app {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    main {
        flex: 1;
    }

    footer {
        display: flex;
        justify-content: center;
        text-align: center;
    }
</style>

<Styles />