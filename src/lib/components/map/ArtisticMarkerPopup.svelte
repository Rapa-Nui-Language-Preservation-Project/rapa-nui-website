<script lang="ts">
	import { MapPin } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import type { CarouselAPI } from '$lib/components/ui/carousel/context.js';
	import type { ExpandedLocation } from '$lib/expanded-models';
	import { writable } from 'svelte/store';

	// Shared store to track which popup is open
	export const openPopupId = writable<string | null>(null);

	let { location }: { location: ExpandedLocation } = $props();

	let mediaAPI = $state<CarouselAPI>();
	let storyAPI = $state<CarouselAPI>();
	let mediaCurrent = $state(0);
	let storyCurrent = $state(0);
	let isOpen = $state(false);

	// Reactively track if this popup is the open one
	$effect(() => {
		const unsubscribe = openPopupId.subscribe((id) => {
			isOpen = id === location.id;
		});
		return unsubscribe;
	});

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

	function togglePopup() {
		openPopupId.update((id) => (id === location.id ? null : location.id));
	}
</script>

<!-- Marker and Popup -->
<div class="flex flex-col items-center justify-center text-black drop-shadow-lg">
	{#if !isOpen}
		<button
			class="flex flex-col items-center justify-center cursor-pointer"
			onclick={togglePopup}
		>
			<!-- More visible marker color -->
			<MapPin class="text-white drop-shadow" />
			<Button variant="link" class="text-sm font-bold text-white">{location.name}</Button>
		</button>
	{/if}

	{#if isOpen}
		<!-- White popup panel -->
		<div class="z-50 mt-2 w-72 rounded-md border border-gray-300 bg-white p-4 shadow-lg">
			<h2 class="text-lg font-bold mb-2">{location.name}</h2>
			<p class="text-sm mb-4">{location.description}</p>

			{#if location.expand.media?.length === 1}
				<div class="text-center mb-4">
					<h3 class="text-md font-semibold mb-2">Media</h3>
					<img src={location.expand.media[0].file} alt={location.expand.media[0].description} />
					<p class="text-sm mt-1">{location.expand.media[0].title}</p>
				</div>
			{:else if location.expand.media?.length > 1}
				<Carousel.Root setApi={(api) => (mediaAPI = api)} class="mb-4 text-center">
					<h3 class="text-md font-semibold mb-2">Media</h3>
					<Carousel.Content>
						{#each location.expand.media || [] as media}
							<Carousel.Item class="flex flex-col items-center">
								<img src={media.file} alt={media.description} />
								<p class="text-sm">{media.title}</p>
							</Carousel.Item>
						{/each}
					</Carousel.Content>
					<Carousel.Previous variant="secondary" />
					<Carousel.Next variant="secondary" />
				</Carousel.Root>
				<div class="text-center text-sm text-muted-foreground">
					{mediaCurrent} of {location.expand.media.length}
				</div>
			{/if}

			{#if location.expand.story?.length === 1}
				<div class="text-center mt-4">
					<h3 class="text-md font-semibold mb-2">Story</h3>
					<img src={location.expand.story[0].field} alt={location.expand.story[0].image_title} />
					<p class="text-sm mt-1">{location.expand.story[0].title}</p>
				</div>
			{:else if location.expand.story?.length > 1}
				<Carousel.Root setApi={(api) => (storyAPI = api)} class="mt-4 text-center">
					<h3 class="text-md font-semibold mb-2">Stories</h3>
					<Carousel.Content>
						{#each location.expand.story || [] as story}
							<Carousel.Item class="flex flex-col items-center">
								<img src={story.field} alt={story.image_title} />
								<p class="text-sm">{story.title}</p>
							</Carousel.Item>
						{/each}
					</Carousel.Content>
					<Carousel.Previous variant="secondary" />
					<Carousel.Next variant="secondary" />
				</Carousel.Root>
				<div class="text-center text-sm text-muted-foreground">
					{storyCurrent} of {location.expand.story.length}
				</div>
			{/if}
		</div>
	{/if}
</div>
