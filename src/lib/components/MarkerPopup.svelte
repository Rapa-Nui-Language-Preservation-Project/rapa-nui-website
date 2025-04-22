<script lang="ts">
	import { MapPin } from 'lucide-svelte';
	import { Marker } from 'svelte-maplibre-gl';
	import { Button } from '$lib/components/ui/button';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import type { CarouselAPI } from '$lib/components/ui/carousel/context.js';
	import type { Location } from '$lib/models';

	let api = $state<CarouselAPI>();

	const count = $derived(api ? api.scrollSnapList().length : 0);
	let current = $state(0);

	$effect(() => {
		if (api) {
			current = api.selectedScrollSnap() + 1;
			api.on('select', () => {
				current = api!.selectedScrollSnap() + 1;
			});
		}
	});

	let { location }: { location: Location } = $props();
</script>

<Marker lnglat={{ lng: location.longitude, lat: location.latitude }}>
	{#snippet content()}
		<Popover.Root>
			<Popover.Trigger class="flex flex-col items-center justify-center">
				<MapPin />
				<div class="drop-shadow-xs font-bold">{location.name}</div>
			</Popover.Trigger>
			<Popover.Content>
				<div class="flex w-64 flex-col">
					<Button variant="link" class="text-lg font-bold">{location.name}</Button>
					<p class="text-md my-2 font-normal">{location.description}</p>
					<Carousel.Root setApi={(emblaApi) => (api = emblaApi)} class="w-64">
						<Carousel.Content>
							{#each location.expand.media as media}
								<Carousel.Item class="flex w-64 flex-col items-center justify-center">
									<img src={media.file} alt={media.description} />
									<p class="text-sm">{media.title}</p>
								</Carousel.Item>
							{/each}
						</Carousel.Content>
						<Carousel.Previous variant="secondary" />
						<Carousel.Next variant="secondary" />
					</Carousel.Root>
					<div class="py-2 text-center text-sm text-muted-foreground">
						{current} of {count}
					</div>
				</div>
			</Popover.Content>
		</Popover.Root>
	{/snippet}
</Marker>
