<script lang="ts">


	import { Button, Icon, Spinner } from '@sveltestrap/sveltestrap';

	export let text: string;
	export let color: string;
	export let disabled: boolean = false;
	export let icon: string = '';
	export let type: string = 'button';
	export let loading: boolean = false;
	export let outline: boolean = false;
</script>

<Button on:click
				color="{color}"
				disabled="{disabled || loading}"
				type="{type}"
				outline="{outline}">
	{#if icon && !loading}
		<Icon name="{icon}" />
	{/if}
	{#if loading}
		<Spinner type="border" color="secondary" size="sm" />
	{/if}
	{text}
</Button>
