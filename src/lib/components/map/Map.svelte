<script lang="ts">
	import { onMount } from 'svelte';
	import { PMTilesProtocol } from 'svelte-maplibre-gl/pmtiles';
	import { MapLibre } from 'svelte-maplibre-gl';
	import type { ExpandedLayer } from '$lib/expanded-models.ts';
	import { mode } from 'mode-watcher';
	import MarkerPopup from './overlays/MarkerPopup.svelte';
	import CalibrationTool from './tools/CalibrationTool.svelte';
	import { transformLatLngToXY } from '$lib/utils/geoTransform';
	import LocationDialog from './layers/LocationDialog.svelte';
	import LeftSidebar from './sidebars/LeftSidebar.svelte';
	import RightSidebar from './sidebars/RightSidebar.svelte';
	import SidebarControls from './sidebars/SidebarControls.svelte';
	import type { PruebasResponse } from '$lib/pocketbase-types';
	import { watchMediaQuery } from '$lib/utils/media-query';
	import MobileMap from './MobileMap.svelte';

	let dark = $state(false);
	mode.subscribe((m) => {
		dark = m === 'dark';
	});

	let {
		layers,
		bases,
		pruebas
	}: { layers: ExpandedLayer[]; bases: string[]; pruebas: PruebasResponse[] } = $props();
	// TODO: here is pruebas, currently unused, this should be used as a tooltip for the corresponding prueba in the KoroNui layer
	void pruebas;
	let selectedLayers = $state(new Map<string, ExpandedLayer>());
	let selectedBase = $state(bases[0]);
	let calibrate = false;
	let isMobile = $state(false);
	const artisticMapSrc =
		'http://127.0.0.1:8090/api/files/ia77ailu3ghoodv/6jjx168s5ezt2m8/map_k7mm569qll.png';

	onMount(() => {
		return watchMediaQuery('(max-width: 768px)', (matches) => {
			isMobile = matches;
		});
	});

	// Sidebar visibility states
	let leftSidebarVisible = $state(true);
	let rightSidebarVisible = $state(true);
</script>

{#if isMobile}
	<MobileMap {artisticMapSrc} />
{:else}
	<div class="flex h-screen w-screen justify-center overflow-hidden bg-gray-100">
		<PMTilesProtocol />

		<!-- Map Container -->
		<div class="relative flex-1 bg-gray-900 transition-all duration-500 ease-in-out">
			<div
				class="pointer-events-none absolute left-1/2 top-8 z-10 -translate-x-[-50%] scale-90 transform rounded-lg bg-gradient-to-b from-amber-50 to-orange-50 px-6 py-3 font-serif text-amber-900 shadow-lg"
				style="font-family: 'Merriweather', serif;"
			>
				<h1 class="text-xl font-semibold tracking-wide md:text-3xl">
					Rapa Nui:<br />
					Lengua y Cultura
				</h1>
			</div>
			{#if selectedBase === 'Geografía'}
				<MapLibre
					class="absolute left-0 top-0 h-screen w-full"
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
					<MarkerPopup layers={[...selectedLayers.values()]} />
				</MapLibre>
			{:else if selectedBase === 'Rapa Nui'}
				{#if calibrate}
					<CalibrationTool />
				{:else}
					<div class="relative ml-80 mr-64 h-screen overflow-hidden">
						<img src={artisticMapSrc} class="h-screen w-auto min-w-max" alt="Map of Easter Island" />

						{#each selectedLayers.values() as layer}
							{#each layer.expand.locations || [] as location}
								{#if location.latitude != null && location.longitude != null}
									{@const pos = transformLatLngToXY(location.latitude, location.longitude)}
									<div
										class="absolute z-10"
										style={`top: ${pos.y}%; left: ${pos.x}%; transform: translate(-50%, -50%);`}
									>
										<LocationDialog {location} layerName={layer.name} />
									</div>
								{/if}
							{/each}
						{/each}
					</div>
				{/if}
			{/if}
		</div>

		<SidebarControls bind:leftVisible={leftSidebarVisible} bind:rightVisible={rightSidebarVisible} />
		<!-- Left Sidebar - Layers -->
		<LeftSidebar {layers} bind:selectedLayers visible={leftSidebarVisible} />
		<!-- Right Sidebar - Map Style -->
		<RightSidebar {bases} bind:selectedBase visible={rightSidebarVisible} />
	</div>
{/if}
