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
	import ArtisticMarkerPopup from './ArtisticMarkerPopup.svelte';



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
				<div class="relative h-screen w-auto">
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
									<ArtisticMarkerPopup {location} />
								</div>
							{/if}
						{/each}
					{/each}
				</div>				
				{/if}
			{/if}
	</div>
</div>
<nav class="absolute bottom-0 right-0">
	<div
		class={`items-left m-8 flex flex-col gap-3 rounded-md p-4 backdrop-blur-md ${
			selectedBase === 'Artistic' ? 'bg-white/70' : 'bg-background/80'
		}`}
	>
		<BaseToggler {bases} bind:selectedBase />
		<LayerToggler {layers} bind:selectedLayers />
	</div>
</nav>
