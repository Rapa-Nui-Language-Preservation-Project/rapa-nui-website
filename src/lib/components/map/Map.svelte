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

<div class="flex h-screen w-screen justify-center bg-black">
	<PMTilesProtocol />
	<div class="">
		{#if selectedBase === 'Geographic'}
			<MapLibre
				class="absolute left-0 top-0 h-screen w-screen"
				attributionControl={false}
				zoom={11}
				maxZoom={20}
				maplibreLogo={false}
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
			<img
				src="http://127.0.0.1:8090/api/files/ia77ailu3ghoodv/6jjx168s5ezt2m8/map_k7mm569qll.png"
				class="h-screen"
				alt="Map of Easter Island"
			/>
		{/if}
	</div>
</div>
<nav class="absolute bottom-0 right-0">
	<BaseToggler {bases} bind:selectedBase />
	<LayerToggler {layers} bind:selectedLayers />
</nav>
