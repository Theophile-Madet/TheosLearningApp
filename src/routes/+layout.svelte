<script>
	import Header from './Header.svelte';
	import './styles.css';
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<p>
			Made by <a href="https://seriousdino.org/">Serious Dino</a>, check out the code on
			<a href="https://github.com/Theophile-Madet/TheosLearningApp">GitHub</a>
		</p>
	</footer>
</div>

<style>
    footer {
        display: flex;
        justify-content: center;
    }
</style>
