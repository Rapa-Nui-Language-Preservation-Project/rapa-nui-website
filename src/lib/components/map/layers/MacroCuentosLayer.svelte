<script lang="ts">
	import type { ExpandedLocation } from '$lib/expanded-models';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import type { CarouselAPI } from '$lib/components/ui/carousel/context.js';

	let { location }: { location: ExpandedLocation } = $props();

	const author = $derived(location.expand?.author);
	const stories = $derived(author?.expand?.stories ?? []);

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
		console.log('MacroCuentos location expand:', JSON.stringify(location.expand, null, 2));
	});

	const hasBioSpanish = $derived(Boolean(author?.bio_en?.trim()));
	const hasDedication = $derived(
		Boolean(author?.dedication_rn?.trim()) || Boolean(author?.dedication_en?.trim())
	);
</script>

{#if !author}
	<div class="p-8 text-center text-muted-foreground">
		<p class="text-lg font-semibold">No author linked to this location</p>
		<p class="mt-2 text-sm">Check that the <code>author</code> field on this location record in PocketBase is populated.</p>
	</div>
{:else if author}
	<div class="flex flex-col items-center gap-6 text-center" style="font-family: 'Merriweather', serif;">

		<!-- Author section -->
		<div class="flex flex-col items-center gap-3">
			<h1 class="text-3xl font-bold">{author.name}</h1>

			{#if hasBioSpanish}
				<button
					onclick={() => (showSpanish = !showSpanish)}
					class="rounded-full bg-primary px-4 py-2 text-white shadow hover:bg-primary/80"
				>
					{showSpanish ? 'Ver en Rapa Nui' : 'Ver en Español'}
				</button>
			{/if}

			<p class="max-w-prose whitespace-pre-line px-4 text-justify text-base leading-relaxed">
				{showSpanish && author.bio_en?.trim() ? author.bio_en : author.bio_rn}
			</p>

			{#if hasDedication}
				<div class="mt-2 max-w-prose border-l-4 border-amber-700 pl-4 text-left italic text-amber-900">
					<p class="text-sm font-semibold mb-1">
						{showSpanish ? 'Dedicatoria' : 'Tuku i roto i te manava'}
					</p>
					<p class="whitespace-pre-line text-sm">
						{showSpanish && author.dedication_en?.trim()
							? author.dedication_en
							: author.dedication_rn}
					</p>
				</div>
			{/if}
		</div>

		<!-- Stories section -->
		{#if stories.length > 0}
			<div class="w-full border-t border-muted pt-4">
				<h2 class="mb-3 text-lg font-semibold text-amber-800">
					{showSpanish ? 'Relatos' : 'He tumu kōrero'}
				</h2>

				{#if stories.length === 1}
					{@const story = stories[0]}
					{@const hasStorySpanish = Boolean(story.text_spanish?.trim())}
					<div class="flex flex-col items-center gap-3">
						{#if story.field}
							<img src={story.field} alt={story.image_title} class="max-w-full rounded-lg shadow-lg" />
							{#if story.image_title}
								<p class="text-xs italic text-muted-foreground">{story.image_title}</p>
							{/if}
						{/if}
						<h3 class="text-2xl font-bold">
							{showSpanish && story.title_spanish?.trim() ? story.title_spanish : story.title}
						</h3>
						<p class="max-w-prose whitespace-pre-line px-4 text-justify text-lg">
							{showSpanish && hasStorySpanish ? story.text_spanish : story.text_rapanui}
						</p>
					</div>
				{:else}
					<Carousel.Root
						setApi={(emblaApi) => (storyAPI = emblaApi)}
						class="flex flex-col items-center"
					>
						<Carousel.Content>
							{#each stories as story}
								{@const hasStorySpanish = Boolean(story.text_spanish?.trim())}
								<Carousel.Item class="flex flex-col items-center gap-3">
									{#if story.field}
										<img
											src={story.field}
											alt={story.image_title}
											class="max-w-full rounded-lg shadow-lg"
										/>
										{#if story.image_title}
											<p class="text-xs italic text-muted-foreground">{story.image_title}</p>
										{/if}
									{/if}
									<h3 class="text-2xl font-bold">
										{showSpanish && story.title_spanish?.trim() ? story.title_spanish : story.title}
									</h3>
									<p class="max-w-prose whitespace-pre-line px-4 text-justify text-lg">
										{showSpanish && hasStorySpanish ? story.text_spanish : story.text_rapanui}
									</p>
								</Carousel.Item>
							{/each}
						</Carousel.Content>
						<Carousel.Previous variant="secondary" />
						<Carousel.Next variant="secondary" />
					</Carousel.Root>
					<div class="mt-2 text-sm text-muted-foreground">
						{storyCurrent} of {storyCount}
					</div>
				{/if}
			</div>
		{/if}
	</div>
{/if}
