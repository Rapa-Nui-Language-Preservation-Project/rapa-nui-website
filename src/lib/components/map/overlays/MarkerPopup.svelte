<script lang="ts">
	import type { ExpandedLayer } from '$lib/expanded-models';
	import { Marker } from 'svelte-maplibre-gl';
	import LocationDialog from '../layers/LocationDialog.svelte';

	let { layers }: { layers: ExpandedLayer[] } = $props();
</script>

{#each layers as layer}
	{#each layer.expand.locations || [] as location}
		<Marker lnglat={{ lng: location.longitude || 0, lat: location.latitude || 0 }}>
			{#snippet content()}
				<LocationDialog {location} layerName={layer.name} />
			{/snippet}
		</Marker>
	{/each}
{/each}
