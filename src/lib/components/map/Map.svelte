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
	let selectedBase = $state(bases[1]);
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

<div class="flex h-screen w-screen justify-center bg-gray-100 overflow-hidden">
	<PMTilesProtocol />
	
	<!-- Map Container -->
	<div class="flex-1 relative bg-gray-900 transition-all duration-500 ease-in-out">
		{#if selectedBase === 'Geográfica'}
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
		{:else if selectedBase === 'Artística'}
			{#if calibrate}
				<CalibrationTool />
			{:else}
				<div class="relative h-screen w-auto ml-80 mr-64">
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

	<!-- Click areas to show sidebars when hidden -->
	{#if areSidebarsHidden}
		<div
			role="button"
			tabindex="0"
			onclick={showSidebars}
			onkeydown={(e) => e.key === 'Enter' && showSidebars()}
			class="fixed top-0 left-0 h-full w-1/4 md:w-1/6 bg-transparent z-10 cursor-pointer group"
		>
			<ChevronRight
				class="fixed top-1/2 left-4 transform -translate-y-1/2 text-white/50 group-hover:text-white group-hover:scale-125 transition-all duration-300"
				size={32}
			/>
		</div>

		<div
			role="button"
			tabindex="0"
			onclick={showSidebars}
			onkeydown={(e) => e.key === 'Enter' && showSidebars()}
			class="fixed top-0 right-0 h-full w-1/4 md:w-1/6 bg-transparent z-10 cursor-pointer group"
		>
			<ChevronLeft
				class="fixed top-1/2 right-4 transform -translate-y-1/2 text-white/50 group-hover:text-white group-hover:scale-125 transition-all duration-300"
				size={32}
			/>
		</div>
	{/if}

	<!-- Left Sidebar - Layers -->
	<div
		class={`fixed top-0 left-0 h-full w-96 bg-gradient-to-b from-amber-50 to-orange-50 text-amber-900 font-serif border-r border-black/10 overflow-y-auto transition-all duration-500 ease-in-out z-20 
		${leftSidebarVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}`}
		style="font-family: 'Merriweather', serif;"
	>
		<div class="p-6">
			<h2 class="text-2xl font-bold mb-1rem text-center tracking-wider">Capas</h2>
			<div class="space-y-2">
				<LayerToggler {layers} bind:selectedLayers />
			</div>
		</div>
	</div>

	<!-- Right Sidebar - Map Style -->
	<div
		class={`fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-amber-50 to-orange-50 text-amber-900 font-serif border-l border-black/10 overflow-y-auto transition-all duration-500 ease-in-out z-20 
		${rightSidebarVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}
		style="font-family: 'Merriweather', serif;"
	>
		<div class="p-6">
			<h2 class="text-2xl font-bold mb-8 text-center tracking-wider">Mapas</h2>
			<div class="space-y-4">
				<BaseToggler {bases} bind:selectedBase />
			</div>
		</div>
	</div>

	<!-- Hide Sidebars Button -->
	{#if leftSidebarVisible || rightSidebarVisible}
		<button
			onclick={hideSidebars}
			class="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-full shadow-xl z-30 transition-colors"
			aria-label="Hide Sidebars"
		>
			<EyeOff size={24} />
		</button>
	{/if}
</div>