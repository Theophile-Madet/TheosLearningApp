<script>
	import dino from '$lib/images/dino.svg';
</script>

<header>
	<div>
		<img src="{dino}" alt="Dino logo" />
	</div>
</header>

<style>
    header div {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 2vh;
    }

    header img {
        max-width: 50vh;
        max-height: 15vh;
    }
</style>
