<script lang="ts">
	import { MapPin } from 'lucide-svelte';
	import { Marker } from 'svelte-maplibre-gl';
	import { Button } from '$lib/components/ui/button';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import type { CarouselAPI } from '$lib/components/ui/carousel/context.js';
	import type { ExpandedLocation } from '$lib/expanded-models';

	let mediaAPI = $state<CarouselAPI>();
	let storyAPI = $state<CarouselAPI>();

	const mediaCount = $derived(mediaAPI ? mediaAPI.scrollSnapList().length : 0);
	const storyCount = $derived(storyAPI ? storyAPI.scrollSnapList().length : 0);
	let mediaCurrent = $state(0);
	let storyCurrent = $state(0);

	$effect(() => {
		if (mediaAPI) {
			mediaCurrent = mediaAPI.selectedScrollSnap() + 1;
			mediaAPI.on('select', () => {
				mediaCurrent = mediaAPI!.selectedScrollSnap() + 1;
			});
		}
		if (storyAPI) {
			storyCurrent = storyAPI.selectedScrollSnap() + 1;
			storyAPI.on('select', () => {
				storyCurrent = storyAPI!.selectedScrollSnap() + 1;
			});
		}
	});

	let { location }: { location: ExpandedLocation } = $props();
</script>

<Marker lnglat={{ lng: location.longitude || 0, lat: location.latitude || 0 }}>
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
					{#if location.expand.media?.length == 1}
						<div class="w-64 text-center">
							<h2 class="text-md m-2">Media</h2>
							<img src={location.expand.media[0].file} alt={location.expand.media[0].description} />
							<p class="m-2 text-sm">{location.expand.media[0].title}</p>
						</div>
					{:else if location.expand.media?.length > 1}
						<Carousel.Root setApi={(emblaApi) => (mediaAPI = emblaApi)} class="w-64 text-center">
							<h2 class="text-md">Media</h2>
							<Carousel.Content>
								{#each location.expand.media || [] as media}
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
							{mediaCurrent} of {mediaCount}
						</div>
					{/if}
					{#if location.expand.story?.length == 1}
						<div class="w-64 text-center">
							<h2 class="text-md m-2">Story</h2>
							<img
								src={location.expand.story[0].field}
								alt={location.expand.story[0].image_title}
							/>
							<p class="m-2 text-sm">{location.expand.story[0].title}</p>
						</div>
					{:else if location.expand.story?.length > 1}
						<Carousel.Root
							setApi={(emblaApi) => (storyAPI = emblaApi)}
							class="flex w-64 flex-col items-center justify-center"
						>
							<h2 class="text-md">Stories</h2>
							<Carousel.Content>
								{#each location.expand.story || [] as story}
									<Carousel.Item class="flex w-64 flex-col items-center justify-center">
										<img src={story.field} alt={story.image_title} />
										<p class="text-sm">{story.title}</p>
									</Carousel.Item>
								{/each}
							</Carousel.Content>
							<Carousel.Previous variant="secondary" />
							<Carousel.Next variant="secondary" />
						</Carousel.Root>
						<div class="py-2 text-center text-sm text-muted-foreground">
							{storyCurrent} of {storyCount}
						</div>
					{/if}
				</div>
			</Popover.Content>
		</Popover.Root>
	{/snippet}
</Marker>
