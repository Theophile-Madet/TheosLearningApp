<script lang="ts">


	import { Button, Icon, Spinner, type TextColor } from '@sveltestrap/sveltestrap';

	interface Props {
		text: string;
		color: TextColor;
		disabled?: boolean;
		icon?: string;
		type?: string;
		loading?: boolean;
		outline?: boolean;
	}

	let {
		text,
		color,
		disabled = false,
		icon = '',
		type = 'button',
		loading = false,
		outline = false
	}: Props = $props();

	let spinnerColor = (color + '-emphasis') as TextColor;
</script>

<Button on:click
				color={color}
				disabled={disabled || loading}
				type={type}
				outline={outline}>
	{#if icon && !loading}
		<Icon name={icon} />
	{/if}
	{#if loading}
		<Spinner type="border" color={spinnerColor} size="sm" />
	{/if}
	{text}
</Button>
