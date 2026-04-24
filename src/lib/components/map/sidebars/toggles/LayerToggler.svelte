<script lang="ts">
	import { type ExpandedLayer } from '$lib/expanded-models';
	import Fa from 'svelte-fa';
	import {
		faBookOpen,
		faLightbulb,
		faMapMarkerAlt,
		faCrow,
		faCirclePlay,
		faLeaf,
		faBook,
		faCircleInfo
	} from '@fortawesome/free-solid-svg-icons';
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
	import MacroCuentosInfoDialog from '$lib/components/map/layers/MacroCuentosInfoDialog.svelte';
	import AgroecologyKey from '$lib/components/map/layers/AgroecologyKey.svelte';

	let {
		layers,
		selectedLayerId = $bindable()
	}: { layers: ExpandedLayer[]; selectedLayerId?: string | null } = $props();

	let showMacroInfo = $state(false);
	let showAgroKey = $state(false); // for displaying Agroecology Key Dialog
	let hasSeenAgroKey = $state(false); // flag so that the key doesn't open every time user selects agroecology layer

	const toggleLayer = (layer: ExpandedLayer) => {
		const isSelecting = selectedLayerId !== layer.id;
		selectedLayerId = isSelecting ? layer.id : null;
		if (isSelecting && layer.name.startsWith('Agro') && !hasSeenAgroKey) {
			showAgroKey = true;
			hasSeenAgroKey = true;
		} else if (isSelecting && (layer.name.startsWith('Macro') || layer.name.startsWith('ʼAʼAMU'))) {
			showMacroInfo = true;
		}
	};

	// user can manually reopen agroecology key using the 'info' circle button
	const openAgroKey = (e: MouseEvent) => {
		e.stopPropagation();
		showAgroKey = true;
	};
</script>

<MacroCuentosInfoDialog bind:open={showMacroInfo} />
<AgroecologyKey bind:open={showAgroKey} />

{#each layers as layer}
	<div
		role="button"
		tabindex="0"
		onclick={() => toggleLayer(layer)}
		onkeydown={(e) => e.key === 'Enter' && toggleLayer(layer)}
		class="group relative cursor-pointer overflow-hidden rounded-lg px-6 py-1"
	>
		<!-- Color flow selection bar -->
		<div
			class={`absolute left-0 top-0 h-full w-1.5 bg-orange-600 transition-transform duration-300 ease-out ${
				selectedLayerId === layer.id ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'
			}`}
		></div>

		<!-- Layer name and icon -->
		<div class="flex items-center justify-between">
			<span
				class="mb-1 text-lg font-medium text-amber-900 transition-colors duration-200 group-hover:text-orange-600"
			>
				{layer.name}
			</span>
			<div>
				{#if layer.name.startsWith('Aves')}
					<Fa icon={faCrow} color="blue" />
				{:else if layer.name.startsWith('A ‘AMU')}
					<Fa icon={faBookOpen} color="blue" />
				{:else if layer.name.startsWith('Koro')}
					<Fa icon={faLightbulb} color="blue" />
				{:else if layer.name.startsWith('Hist')}
					<Fa icon={faCirclePlay} color="blue" />
				{:else if layer.name.startsWith('Agro')}
					<div class="flex items-center gap-2">
						{#if selectedLayerId === layer.id}
							<button
								onclick={openAgroKey}
								class="text-amber-600 transition-colors hover:text-orange-600"
								title="Clave"
							>
								<Fa icon={faCircleInfo} size="lg" />
							</button>
						{/if}
						<Fa icon={faLeaf} color="blue" />
					</div>
				{:else if layer.name.startsWith('Macro') || layer.name.startsWith('ʼAʼAMU')}
					<div class="flex items-center gap-2">
						{#if selectedLayerId === layer.id}
							<button
								onclick={(e) => {
									e.stopPropagation();
									showMacroInfo = true;
								}}
								class="text-amber-600 transition-colors hover:text-orange-600"
								title="Sobre el libro"
							>
								<Fa icon={faCircleInfo} size="lg" />
							</button>
						{/if}
						<Fa icon={faBook} color="blue" />
					</div>
				{:else}
					<Fa icon={faMapMarkerAlt} color="blue" />
				{/if}
			</div>
		</div>

		<!-- Description -->
		{#if layer.description}
			<p class="text-xs leading-relaxed text-amber-900 opacity-80">
				{layer.description}
			</p>
		{/if}

		<!-- Cover photo -->
		{#if layer.cover_photo && layer.cover_photo.length > 0}
			<div class="relative my-2 aspect-[16/10] overflow-hidden rounded bg-white">
				<img
					src={`${PUBLIC_POCKETBASE_URL}/files/layers/${layer.id}/${layer.cover_photo[0]}`}
					alt={`Cover photo for ${layer.name}`}
					class={`h-full w-full object-contain transition-transform duration-300 ease-in-out group-hover:scale-105 ${
						selectedLayerId === layer.id
							? 'ring-2 ring-orange-500 ring-offset-2 ring-offset-amber-50'
							: ''
					}`}
				/>
			</div>
		{/if}
	</div>
{/each}
