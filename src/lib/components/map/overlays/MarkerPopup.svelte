<script lang="ts">
	import type { ExpandedLayer } from '$lib/expanded-models';
	import { Marker } from 'svelte-maplibre-gl';
	import LocationDialog from '../layers/LocationDialog.svelte';
	import type { PruebasResponse } from '$lib/pocketbase-types';

	let { layers, pruebas }: { layers: ExpandedLayer[]; pruebas: PruebasResponse[] } = $props();
</script>

{#each layers as layer}
	{#each layer.expand.locations || [] as location}
		<Marker lnglat={{ lng: location.longitude || 0, lat: location.latitude || 0 }}>
			{#snippet content()}
				<LocationDialog {location} layerName={layer.name} {pruebas} />
			{/snippet}
		</Marker>
	{/each}
{/each}
