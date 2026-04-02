<script lang="ts">
	import type { ExpandedLayer } from '$lib/expanded-models';
	import { Marker } from 'svelte-maplibre-gl';
	import LocationDialog from '../layers/LocationDialog.svelte';
	import type { PruebasResponse } from '$lib/pocketbase-types';

	let { layers, pruebas }: { layers: ExpandedLayer[]; pruebas: PruebasResponse[] } = $props();
</script>

{#each layers as layer (layer.id)}
	{#each (layer.expand?.locations || []).filter((l) => l.latitude != null && l.longitude != null) as location (location.id)}
		<Marker lnglat={{ lng: location.longitude, lat: location.latitude }}>
			{#snippet content()}
				<LocationDialog {location} layerName={layer.name} {pruebas} />
			{/snippet}
		</Marker>
	{/each}
{/each}
