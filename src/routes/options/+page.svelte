<script lang="ts">
	import { useLearningDinoApi } from '../../utils/useLearningDinoApi';
	import { LearningApi, type OptionGroup } from '../../learning-dino-api-client';
	import { Col, Container, Input, Row, Spinner } from '@sveltestrap/sveltestrap';
	import { onMount } from 'svelte';

	let option_groups: OptionGroup[] = [];
	let optionsLoading = true;

	onMount(async () => {
		const learningApi = useLearningDinoApi(LearningApi);
		learningApi.learningApiGetOptionsRetrieve().then((options) => {
			option_groups = options.groups;
		}).catch((error) => {
			alert('Error not implemented');
			console.error(error);
		}).finally(() => {
			optionsLoading = false;
		});

	});
</script>


<svelte:head>
	<title>Learning Dino - Options</title>
	<meta name="description" content="User options" />
</svelte:head>

<Container>
	<Row>
		<Col>
			<h1>Options</h1>
		</Col>
	</Row>
	<Row>
		<Col>
			{#if optionsLoading}
				<Spinner type="border" color="secondary" />
			{:else}
				{#each option_groups as group}
					<h3>{group.name}</h3>
					<div class="mb-2">
						{#each group.options as option}
							<Input type="switch" id="{option.key}" label="{option.displayName}" checked="{option.isEnabled}" />
						{/each}
					</div>
				{/each}
			{/if}

		</Col>
	</Row>
</Container>

<style>
    h1 {
        text-align: center;
        margin-bottom: 3vh;
    }
</style>
