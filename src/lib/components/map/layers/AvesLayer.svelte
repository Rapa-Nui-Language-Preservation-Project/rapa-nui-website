<script lang="ts">
	import type { ExpandedLocation } from '$lib/expanded-models';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import type { CarouselAPI } from '$lib/components/ui/carousel/context.js';

	let { location }: { location: ExpandedLocation } = $props();
	let mediaAPI = $state<CarouselAPI>();
	let mediaCurrent = $state(0);
	const mediaCount = $derived(mediaAPI ? mediaAPI.scrollSnapList().length : 0);

	$effect(() => {
		if (mediaAPI) {
			mediaCurrent = mediaAPI.selectedScrollSnap() + 1;
			mediaAPI.on('select', () => {
				mediaCurrent = mediaAPI!.selectedScrollSnap() + 1;
			});
		}
	});
</script>

<h1 class="text-xl font-bold">{location.name}</h1>
<p class="text-md preserve-whitespace text-center font-normal">
	{location.description_espanol}
</p>
{#if location.expand.media?.length == 1}
	<div class="flex flex-col items-center justify-center text-center">
		<img
			src={location.expand.media[0].file}
			alt={location.expand.media[0].description}
			width="75%"
		/>
		<p class="m-2 text-sm">{location.expand.media[0].title}</p>
	</div>
{:else if location.expand.media?.length > 1}
	<div class="flex flex-col items-center justify-center px-16 text-center">
		<Carousel.Root
			setApi={(emblaApi) => (mediaAPI = emblaApi)}
			class="flex w-fit flex-col items-center justify-center text-center"
		>
			<Carousel.Content>
				{#each location.expand.media || [] as media}
					<Carousel.Item class="flex flex-col items-center justify-center ">
						<img src={media.file} alt={media.description} width="100%" />
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
