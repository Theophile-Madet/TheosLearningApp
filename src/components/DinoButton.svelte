<script lang="ts">


	import { Button, Icon, Spinner, type TextColor } from '@sveltestrap/sveltestrap';

	export let text: string;
	export let color: TextColor;
	export let disabled: boolean = false;
	export let icon: string = '';
	export let type: string = 'button';
	export let loading: boolean = false;
	export let outline: boolean = false;

	let spinnerColor = (color + '-emphasis') as TextColor;
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
		<Spinner type="border" color="{spinnerColor}" size="sm" />
	{/if}
	{text}
</Button>
