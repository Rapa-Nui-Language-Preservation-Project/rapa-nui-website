<script lang="ts">
	import { PMTilesProtocol } from 'svelte-maplibre-gl/pmtiles';
	import { MapLibre } from 'svelte-maplibre-gl';
	import type { ExpandedLayer } from '$lib/expanded-models.ts';
	import { mode } from 'mode-watcher';
	import MarkerPopup from './MarkerPopup.svelte';
	import LayerToggler from './LayerToggler.svelte';
	import BaseToggler from './BaseToggler.svelte';
	import CalibrationTool from './CalibrationTool.svelte';
	import { transformLatLngToXY } from '$lib/utils/geoTransform';
	import DialogContent from './DialogContent.svelte';

	let dark = $state(false);
	mode.subscribe((m) => {
		dark = m === 'dark';
	});

	let { layers, bases }: { layers: ExpandedLayer[]; bases: string[] } = $props();
	let selectedLayers = $state(new Map<string, ExpandedLayer>());
	let selectedBase = $state(bases[1]);
	let calibrate = false; // toggle this to true to enable calibration mode
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
					{#each layer.expand.locations || [] as location}
						<MarkerPopup {location} />
					{/each}
				{/each}
			</MapLibre>
		{:else if selectedBase === 'Artistic'}
			{#if calibrate}
				<CalibrationTool />
			{:else}
				<div class="relative z-10 h-screen w-auto">
					<img
						src="http://127.0.0.1:8090/api/files/ia77ailu3ghoodv/6jjx168s5ezt2m8/map_k7mm569qll.png"
						class="h-screen"
						alt="Map of Easter Island"
					/>

					{#each selectedLayers.values() as layer}
						{#each layer.expand.locations || [] as location}
							{#if location.latitude != null && location.longitude != null}
								{@const pos = transformLatLngToXY(location.latitude, location.longitude)}
								<div
									class="absolute z-10"
									style={`top: ${pos.y}%; left: ${pos.x}%; transform: translate(-50%, -50%);`}
								>
									<DialogContent {location} />
								</div>
							{/if}
						{/each}
					{/each}
				</div>
			{/if}
		{/if}
	</div>
</div>
<nav class="absolute bottom-0 right-0 z-0">
	<div class={`mb-4 flex w-52 flex-col gap-4 bg-black p-2 font-normal text-white`}>
		<h3 class="text-xl">Map Type</h3>
		<BaseToggler {bases} bind:selectedBase />
		<h3 class="text-xl">Layers</h3>
		<LayerToggler {layers} bind:selectedLayers />
	</div>
</nav>
