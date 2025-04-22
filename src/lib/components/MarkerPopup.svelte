<script lang="ts">
	import { MapPin } from 'lucide-svelte';
	import { Marker, Popup } from 'svelte-maplibre-gl';
	import { Button } from '$lib/components/ui/button';
	let { location } = $props();

	let open = $state(false);
</script>

<Marker lnglat={{ lng: location.longitude, lat: location.latitude }}>
	{#snippet content()}
		<button class="flex flex-col items-center justify-center" onclick={() => (open = !open)}>
			<MapPin />
			<div class="drop-shadow-xs font-bold">{location.name}</div>
		</button>
	{/snippet}
	{#if open}
		<Popup bind:open closeButton={false} closeOnClick={true} offset={25} maxWidth={'200px'}>
			<div class="flex flex-col text-background">
				<Button variant="secondary" class="text-lg font-bold">{location.name}</Button>
				<p class="my-4 text-[14px] font-normal text-black">{location.description}</p>
				<div class="flex flex-col gap-2">
					{#each location.expand.media as media}
						<img src={media.file} alt={media.description} />
					{/each}
				</div>
			</div>
		</Popup>
	{/if}
</Marker>
