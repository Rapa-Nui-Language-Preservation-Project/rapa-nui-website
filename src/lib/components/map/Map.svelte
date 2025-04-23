<script lang="ts">
	import { PMTilesProtocol } from 'svelte-maplibre-gl/pmtiles';
	import { MapLibre } from 'svelte-maplibre-gl';
	import type { Layer } from '$lib/models';
	import { mode } from 'mode-watcher';
	import MarkerPopup from './MarkerPopup.svelte';
	import LayerToggler from './LayerToggler.svelte';
	import BaseToggler from './BaseToggler.svelte';

	let dark = $state(false);
	mode.subscribe((m) => {
		dark = m === 'dark';
	});

	let { layers, bases }: { layers: Layer[]; bases: string[] } = $props();
	let selectedLayers = $state(new Map<string, Layer>());
	let selectedBase = $state(bases[0]);
</script>

<PMTilesProtocol />
<div class="absolute bottom-0 left-0 z-40 m-4">
	<BaseToggler {bases} bind:selectedBase />
	<LayerToggler {layers} bind:selectedLayers />
</div>
{#if selectedBase === 'Geographic'}
	<MapLibre
		class="absolute left-0 top-0 h-screen w-screen"
		zoom={11}
		maxZoom={20}
		minZoom={11}
		center={{ lng: -109.35783233642415, lat: -27.123113319688393 }}
		style={dark ? '/map-dark.json' : '/map-light.json'}
		maxBounds={[
			{ lng: -109.65, lat: -27.3 },
			{ lng: -109, lat: -26.96 }
		]}
	>
		{#each selectedLayers.values() as layer}
			{#each layer.expand.locations as location}
				<MarkerPopup {location} />
			{/each}
		{/each}
	</MapLibre>
{:else if selectedBase === 'Artistic'}
	<div class="absolute flex h-screen w-screen items-center justify-center">
		<img
			src="http://127.0.0.1:8090/api/files/ia77ailu3ghoodv/6jjx168s5ezt2m8/map_k7mm569qll.png"
			class="h-screen"
			alt="Map of Easter Island"
		/>
	</div>
{/if}
