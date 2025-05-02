<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { MapPin } from 'lucide-svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import type { CarouselAPI } from '$lib/components/ui/carousel/context.js';
	import type { ExpandedLocation } from '$lib/expanded-models';

	let { location }: { location: ExpandedLocation } = $props();

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
</script>

<Dialog.Root>
	<Dialog.Trigger class="flex flex-col items-center">
		<Tooltip.Provider delayDuration={0}>
			<Tooltip.Root>
				<Tooltip.Trigger>
					<MapPin color="white" />
				</Tooltip.Trigger>
				<Tooltip.Content side="bottom" class="z-50 border-none bg-transparent shadow-none">
					<div class="drop-shadow-xs font-bold text-white">{location.name}</div>
				</Tooltip.Content>
			</Tooltip.Root>
		</Tooltip.Provider>
	</Dialog.Trigger>
	<Dialog.Content class="max-w-screen m-0 h-[90vh] w-[90vw]">
		<div class="flex flex-col items-center">
			<h1 class="text-xl font-bold">{location.name}</h1>
			<p class="text-md font-normal">{location.description}</p>
			{#if location.expand.media?.length == 1}
				<div class="flex flex-col items-center justify-center text-center">
					<h2 class="text-md m-2">Media</h2>
					<img src={location.expand.media[0].file} alt={location.expand.media[0].description} />
					<p class="m-2 text-sm">{location.expand.media[0].title}</p>
				</div>
			{:else if location.expand.media?.length > 1}
				<div class="flex flex-col items-center justify-center px-16 text-center">
					<Carousel.Root
						setApi={(emblaApi) => (mediaAPI = emblaApi)}
						class="flex w-fit flex-col items-center justify-center text-center"
					>
						<h2 class="text-md">Media</h2>
						<Carousel.Content>
							{#each location.expand.media || [] as media}
								<Carousel.Item class="flex flex-col items-center justify-center">
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
				</div>
			{/if}
			{#if location.expand.story?.length == 1}
				<div class="flex flex-col items-center justify-center text-center">
					<h2 class="text-md m-2">Story</h2>
					<img src={location.expand.story[0].field} alt={location.expand.story[0].image_title} />
					<p class="m-2 text-sm">{location.expand.story[0].title}</p>
					<p class="m-2 text-sm">{location.expand.story[0].text_spanish}</p>
				</div>
			{:else if location.expand.story?.length > 1}
				<div class="flex flex-col items-center justify-center text-center">
					<Carousel.Root
						setApi={(emblaApi) => (storyAPI = emblaApi)}
						class="flex flex-col items-center justify-center"
					>
						<h2 class="text-md">Stories</h2>
						<Carousel.Content>
							{#each location.expand.story || [] as story}
								<Carousel.Item class="flex flex-col items-center justify-center">
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
				</div>
			{/if}
		</div>
	</Dialog.Content>
</Dialog.Root>
