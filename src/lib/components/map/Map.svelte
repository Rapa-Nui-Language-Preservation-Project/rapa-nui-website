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
	import { ChevronLeft, ChevronRight, EyeOff } from 'lucide-svelte';

	let dark = $state(false);
	mode.subscribe((m) => {
		dark = m === 'dark';
	});

	let { layers, bases }: { layers: ExpandedLayer[]; bases: string[] } = $props();
	let selectedLayers = $state(new Map<string, ExpandedLayer>());
	let selectedBase = $state(bases[0]);
	let calibrate = false;

	// Sidebar visibility states
	let leftSidebarVisible = $state(true);
	let rightSidebarVisible = $state(true);

	const hideSidebars = () => {
		leftSidebarVisible = false;
		rightSidebarVisible = false;
	};

	const showSidebars = () => {
		leftSidebarVisible = true;
		rightSidebarVisible = true;
	};

	const areSidebarsHidden = $derived(!leftSidebarVisible && !rightSidebarVisible);
</script>

<div class="flex h-screen w-screen justify-center overflow-hidden bg-gray-100">
	<PMTilesProtocol />

	<!-- Map Container -->
	<div class="relative flex-1 bg-gray-900 transition-all duration-500 ease-in-out">
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
				{#each selectedLayers.values() as layer}
					{#each layer.expand.locations || [] as location}
						<MarkerPopup {location} />
					{/each}
				{/each}
			</MapLibre>
		{:else if selectedBase === 'Rapa Nui'}
			{#if calibrate}
				<CalibrationTool />
			{:else}
				<div class="relative ml-80 mr-64 h-screen overflow-hidden">
					<img
						src="http://127.0.0.1:8090/api/files/ia77ailu3ghoodv/6jjx168s5ezt2m8/map_k7mm569qll.png"
						class="h-screen w-auto min-w-max"
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

	<!-- Click areas to show sidebars when hidden -->
	{#if areSidebarsHidden}
		<div
			role="button"
			tabindex="0"
			onclick={showSidebars}
			onkeydown={(e) => e.key === 'Enter' && showSidebars()}
			class="group fixed left-0 top-0 z-10 h-full w-1/4 cursor-pointer bg-transparent md:w-1/6"
		>
			<ChevronRight
				class="fixed left-4 top-1/2 -translate-y-1/2 transform text-white/50 transition-all duration-300 group-hover:scale-125 group-hover:text-white"
				size={32}
			/>
		</div>

		<div
			role="button"
			tabindex="0"
			onclick={showSidebars}
			onkeydown={(e) => e.key === 'Enter' && showSidebars()}
			class="group fixed right-0 top-0 z-10 h-full w-1/4 cursor-pointer bg-transparent md:w-1/6"
		>
			<ChevronLeft
				class="fixed right-4 top-1/2 -translate-y-1/2 transform text-white/50 transition-all duration-300 group-hover:scale-125 group-hover:text-white"
				size={32}
			/>
		</div>
	{/if}

	<!-- Left Sidebar - Layers -->
	<div
		class={`fixed left-0 top-0 z-20 h-full w-96 overflow-y-auto border-r border-black/10 bg-gradient-to-b from-amber-50 to-orange-50 font-serif text-amber-900 transition-all duration-500 ease-in-out 
		${leftSidebarVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'}`}
		style="font-family: 'Merriweather', serif;"
	>
		<div class="p-6">
			<h2 class="mb-1rem text-center text-2xl font-bold tracking-wider">Capas</h2>
			<div class="space-y-2">
				<LayerToggler {layers} bind:selectedLayers />
			</div>
		</div>
	</div>

	<!-- Right Sidebar - Map Style -->
	<div
		class={`fixed right-0 top-0 z-20 h-full w-80 overflow-y-auto border-l border-black/10 bg-gradient-to-b from-amber-50 to-orange-50 font-serif text-amber-900 transition-all duration-500 ease-in-out 
		${rightSidebarVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-full opacity-0'}`}
		style="font-family: 'Merriweather', serif;"
	>
		<div class="p-6">
			<h2 class="mb-8 text-center text-2xl font-bold tracking-wider">Mapas</h2>
			<div class="space-y-4">
				<BaseToggler {bases} bind:selectedBase />
			</div>
		</div>
	</div>

	<!-- Hide Sidebars Button -->
	{#if leftSidebarVisible || rightSidebarVisible}
		<button
			onclick={hideSidebars}
			class="fixed bottom-4 left-1/2 z-30 -translate-x-1/2 transform rounded-full bg-orange-600 p-3 text-white shadow-xl transition-colors hover:bg-orange-700"
			aria-label="Hide Sidebars"
		>
			<EyeOff size={24} />
		</button>
	{/if}
</div>
