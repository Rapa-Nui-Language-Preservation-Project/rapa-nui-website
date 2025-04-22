<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { PMTilesProtocol } from 'svelte-maplibre-gl/pmtiles';
	import { MapLibre } from 'svelte-maplibre-gl';
	import MapLayer from './MapLayer.svelte';
	import { cn } from '$lib/utils';
	import type { Layer } from '$lib/models';

	let { hidden, layers }: { hidden: boolean; layers: Layer[] } = $props();
	let selectedIds = $state<{ id: string; toggled: boolean }[]>(
		layers.map((layer) => ({ id: layer.id, toggled: false }))
	);
	let selectedLayers = $derived(() =>
		selectedIds
			.filter((layer) => layer.toggled)
			.map((layer) => layers.find((l) => l.id === layer.id))
	);
	const toggleLayer = (id: string) => {
		const index = selectedIds.findIndex((l) => l.id === id);
		if (index !== -1) {
			selectedIds[index].toggled = !selectedIds[index].toggled;
		} else {
			selectedIds.push({ id, toggled: true });
		}
	};

	import { mode } from 'mode-watcher';
	let dark = $state(false);
	mode.subscribe((m) => {
		dark = m === 'dark';
	});
</script>

<PMTilesProtocol />
<div
	class="absolute bottom-0 left-0 z-40 m-4 flex flex-col items-center justify-center rounded-lg bg-muted p-4 shadow-lg"
>
	<h2 class="mb-2 text-lg font-semibold">Layers</h2>
	{#each layers as layer}
		<div class="mb-2 flex items-center justify-center gap-2">
			<Label
				class="float-left text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
			>
				{layer.name}
			</Label>
			<Checkbox onclick={() => toggleLayer(layer.id)} />
		</div>
	{/each}
</div>
<MapLibre
	class={cn('absolute left-0 top-0 h-screen w-screen', hidden && 'hidden')}
	zoom={11}
	maxZoom={20}
	minZoom={11}
	center={{ lng: -109.35783233642415, lat: -27.123113319688393 }}
	style={dark ? '/map-dark.json' : '/map-light.json'}
	maxBounds={[
		{ lng: -109.65, lat: -27.3 },
		{ lng: -109, lat: -26.96 }
	]}
	onclick={async (e) => {
		const clipboard = navigator.clipboard;
		await clipboard.writeText(e.lngLat.toString());
	}}
>
	{#each selectedLayers() as layer}
		<MapLayer {layer} />
	{/each}
</MapLibre>
