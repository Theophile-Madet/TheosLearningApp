<script lang="ts">
	import { useLearningDinoApi } from '../../utils/useLearningDinoApi';
	import { LearningApi, type OptionGroup } from '../../learning-dino-api-client';
	import { Col, Container, Input, Row, Spinner } from '@sveltestrap/sveltestrap';
	import { onMount } from 'svelte';
	import { csrfToken } from '../stores';
	import DinoButton from '../../components/DinoButton.svelte';
	import { goto } from '$app/navigation';

	let option_groups: OptionGroup[] = [];
	let optionsLoading = true;

	async function updateCsrfToken() {
		const learningApi = useLearningDinoApi(LearningApi);
		const token = await learningApi.learningApiGetCsrfTokenRetrieve();
		$csrfToken = token.csrfToken;
	}

	onMount(async () => {
		await updateCsrfToken();

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

	function onOptionSet(key: string, enabled: boolean) {
		const learningApi = useLearningDinoApi(LearningApi, fetch, $csrfToken);
		learningApi.learningApiSetOptionCreate({
			setOptionRequestRequest: {
				optionKey: key,
				enabled: enabled
			}
		}).catch((error) => {
			alert('Error not implemented');
			console.error(error);
		});
	}
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
		<Col class="d-flex justify-content-center">
			<DinoButton
				color="secondary"
				outline="{true}"
				on:click={async () => {await goto("/")}} text="Back to game" icon="settings">
			</DinoButton>
		</Col>
	</Row>
	<Row>
		<Col class="d-flex justify-content-center">
			Changes are saved immediately
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
							<Input type="switch" id="{option.key}" label="{option.displayName}" checked="{option.enabled}"
										 on:change={(event) => onOptionSet(option.key, event.target.checked)} />
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
