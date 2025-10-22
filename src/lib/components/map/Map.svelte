<script lang="ts">
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
	import { onMount } from 'svelte';

	let dark = $state(false);
	mode.subscribe((m) => {
		dark = m === 'dark';
	});

	let { layers, bases, pruebas }: { layers: ExpandedLayer[]; bases: string[]; pruebas: any[] } = $props();
	let selectedLayers = $state(new Map<string, ExpandedLayer>());
	let selectedBase = $state(bases[0]);
	let calibrate = false;

	// Sidebar visibility states
	let leftSidebarVisible = $state(true);
	let rightSidebarVisible = $state(true);

	let isDesktop = $state(true);

	/* 
	The geographic map is unnecessary for the current simple mobile view implementation.
	The following logic automatically switches back to the Rapa Nui view in case someone
	switches to the Geographic map while on Desktop then makes their view mobile-sized.

	The main reason for doing this is b/c the Rapa Nui map image looks cleaner to display 
	alongside the message, but also the Geographic map is broken.
	*/
	onMount(() => {
		const checkScreenSize = () => {
			isDesktop = window.innerWidth >= 768;
		};
		
		checkScreenSize();
		window.addEventListener('resize', checkScreenSize);
		
		return () => window.removeEventListener('resize', checkScreenSize);
	});

	$effect(() => {
		if (!isDesktop && selectedBase === 'Geografía') {
			selectedBase = 'Rapa Nui';
		}
	});
</script>

<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex h-screen w-screen justify-center overflow-hidden bg-gray-100 md:ml-0">
	<PMTilesProtocol />

	<!-- Map Container -->
	<div class="relative h-auto w-auto md:flex-1 bg-gray-900 transition-all duration-500 ease-in-out">
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
				<!--Mobile view message-->
				{#if !isDesktop}
					<div class="absolute top text-center z-20 p-3 mt-8 bg-gradient-to-b from-amber-100 to-amber-50 border border-amber-200 rounded-lg m-4"
						style="font-family: 'Merriweather', serif;">
						<h3 class="text-lg font-semibold text-amber-900 mb-2">Desktop Recommended</h3>
						<p class="text-amber-700">
							This interactive map is optimized for desktop exploration to provide the best experience. 
							We recommend switching to a desktop computer or tablet for full map controls and site information.
						</p>
					</div>
				{/if}
				<div class="relative h-full w-full md:ml-80 md:mr-64 md:h-screen md:w-auto overflow-hidden">
					<img
						src="http://127.0.0.1:8090/api/files/ia77ailu3ghoodv/6jjx168s5ezt2m8/map_k7mm569qll.png"
						class="h-full w-full md:h-screen md:w-auto object-contain md:min-w-max"
						alt="Map of Easter Island"
					/>
					{#if isDesktop} <!--Conditional prevents layers from appearing on mobile view-->
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
					{/if}
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
