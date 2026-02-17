<script lang="ts">
	import { onMount } from 'svelte';
	import { PMTilesProtocol } from 'svelte-maplibre-gl/pmtiles';
	import { MapLibre } from 'svelte-maplibre-gl';
	import type { ExpandedLayer } from '$lib/expanded-models.ts';
	import { mode } from 'mode-watcher';
	import MarkerPopup from './overlays/MarkerPopup.svelte';
	import CalibrationTool from './tools/CalibrationTool.svelte';
	import LeftSidebar from './sidebars/LeftSidebar.svelte';
	import ArtisticBaseMap from './ArtisticBaseMap.svelte';
	import RightSidebar from './sidebars/RightSidebar.svelte';
	import SidebarControls from './sidebars/SidebarControls.svelte';
	import type { PruebasResponse } from '$lib/pocketbase-types';
	import { watchMediaQuery } from '$lib/utils/media-query';
	import MobileMap from './MobileMap.svelte';
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

	let dark = $state(false);
	mode.subscribe((m) => {
		dark = m === 'dark';
	});

	let {
		layers,
		bases,
		pruebas
	}: { layers: ExpandedLayer[]; bases: string[]; pruebas: PruebasResponse[] } = $props();

	let selectedLayerId = $state<string | null>(null);
	let selectedBase = $state(bases[0]);
	let calibrate = false;
	let isMobile = $state(false);
	const artisticMapSrc = `${PUBLIC_POCKETBASE_URL}/files/ia77ailu3ghoodv/6jjx168s5ezt2m8/map_k7mm569qll.png`;

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
				class="pointer-events-none absolute left-1/2 top-8 z-10 -translate-x-[-15%] scale-90 transform rounded-lg bg-gradient-to-b from-amber-50 to-orange-50 px-6 py-3 font-serif text-amber-900 shadow-lg"
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
					{#if selectedLayerId}
						{@const selectedLayer = layers.find((l) => l.id === selectedLayerId)}
						{#if selectedLayer}
							<MarkerPopup layers={[selectedLayer]} {pruebas} />
						{/if}
					{/if}
				</MapLibre>
			{:else if selectedBase === 'Rapa Nui'}
				{#if calibrate}
					<CalibrationTool />
				{:else}
					<ArtisticBaseMap imageSrc={artisticMapSrc} {layers} {selectedLayerId} {pruebas} />
				{/if}
			{/if}
		</div>

		<SidebarControls
			bind:leftVisible={leftSidebarVisible}
			bind:rightVisible={rightSidebarVisible}
		/>
		<!-- Left Sidebar - Left Layers -->
		<LeftSidebar {layers} bind:selectedLayerId visible={leftSidebarVisible} />
		<!-- Right Sidebar - Map Style & Layers -->
		<RightSidebar
			{bases}
			{layers}
			bind:selectedBase
			bind:selectedLayerId
			visible={rightSidebarVisible}
		/>
	</div>
{/if}
