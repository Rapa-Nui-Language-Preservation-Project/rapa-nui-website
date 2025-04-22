<script lang="ts">
	import { MapLibre } from 'svelte-maplibre-gl';
	import { PMTilesProtocol } from 'svelte-maplibre-gl/pmtiles';
	import MarkerPopup from './MarkerPopup.svelte';

	let { hidden, locations } = $props();

	import { mode } from 'mode-watcher';
	let dark = $state(false);
	mode.subscribe((m) => {
		dark = m === 'dark';
	});
</script>

<PMTilesProtocol />
<div {hidden}>
	<MapLibre
		class="absolute left-0 top-0 h-screen"
		zoom={11}
		maxZoom={20}
		minZoom={11}
		center={{ lng: -109.35783233642415, lat: -27.123113319688393 }}
		style={dark ? '/map-dark.json' : '/map-light.json'}
		maxBounds={[
			{ lng: -109.65, lat: -27.3 },
			{ lng: -109, lat: -26.96 }
		]}
		onclick={(e) => console.log(e.lngLat)}
	>
		{#each locations as location}
			<MarkerPopup {location} />
		{/each}
	</MapLibre>
</div>
