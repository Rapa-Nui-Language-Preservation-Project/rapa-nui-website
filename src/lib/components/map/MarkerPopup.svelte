<script lang="ts">
	import type { ExpandedLocation } from '$lib/expanded-models';
	import { Marker } from 'svelte-maplibre-gl';
	import DialogContent from './DialogContent.svelte';

	let { location }: { location: ExpandedLocation } = $props();
</script>

<Marker lnglat={{ lng: location.longitude || 0, lat: location.latitude || 0 }}>
	{#snippet content()}
		<DialogContent {location} />
	{/snippet}
</Marker>
