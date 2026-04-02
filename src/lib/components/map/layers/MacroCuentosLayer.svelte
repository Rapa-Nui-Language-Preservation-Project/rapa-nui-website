<script lang="ts">
	import type { ExpandedLocation } from '$lib/expanded-models';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import type { CarouselAPI } from '$lib/components/ui/carousel/context.js';

	let { location }: { location: ExpandedLocation } = $props();
	let storyAPI = $state<CarouselAPI>();
	const storyCount = $derived(storyAPI ? storyAPI.scrollSnapList().length : 0);
	let storyCurrent = $state(0);
	let showSpanish = $state(false);

	function handleSelect() {
		if (!storyAPI) return;
		storyCurrent = storyAPI.selectedScrollSnap() + 1;
	}

	$effect(() => {
		if (!storyAPI) return;

		storyCurrent = storyAPI.selectedScrollSnap() + 1;
		storyAPI.on('select', handleSelect);

		return () => {
			if (!storyAPI) return;
			storyAPI.off('select', handleSelect);
		};
	});

	$effect(() => {
		const story = location.expand.story?.[0];
		const hasSpanishText = Boolean(story?.text_spanish?.trim());
		if (!hasSpanishText) {
			showSpanish = false;
		}
	});
</script>

{#if location.expand.story?.length == 1}
	{@const story = location.expand.story[0]}
	{@const hasSpanishText = Boolean(story.text_spanish?.trim())}
	<div
		class="relative flex flex-col items-center justify-center text-center"
		style="font-family: 'Merriweather', serif;"
	>
		<img src={story.field} alt={story.image_title} class="max-w-[100%] rounded-lg shadow-lg" />
		<p class="mt-1 text-xs italic text-muted-foreground">
			{story.image_title}
		</p>

		{#if hasSpanishText}
			<button
				onclick={() => (showSpanish = !showSpanish)}
				class="mt-4 rounded-full bg-primary px-4 py-2 text-white shadow hover:bg-primary/80"
			>
				{showSpanish ? 'Ver en Rapa Nui' : 'Ver en Español'}
			</button>
		{/if}

		<h1 class="mt-4 text-4xl font-bold">
			{showSpanish && story.title_spanish?.trim() ? story.title_spanish : story.title}
		</h1>

		<h2 class="mb-4 mt-2 text-xl font-semibold text-amber-800">
			{story.author}
		</h2>

		<p class="mt-2 max-w-prose whitespace-pre-line px-4 text-justify text-lg">
			{showSpanish && hasSpanishText ? story.text_spanish : story.text_rapanui}
		</p>
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
						<img src={story.field} alt={story.image_title} width="75%" />
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
