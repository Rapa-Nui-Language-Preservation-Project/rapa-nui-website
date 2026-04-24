<script lang="ts">
	import type { ExpandedLocation } from '$lib/expanded-models';

	let { location }: { location: ExpandedLocation } = $props();

	const author = $derived(location.expand?.author);
	const stories = $derived(author?.expand?.stories ?? []);

	let selectedStoryIdx = $state<number | null>(null);
	let showSpanish = $state(false);

	const hasBioSpanish = $derived(Boolean(author?.bio_en?.trim()));
	const hasDedication = $derived(
		Boolean(author?.dedication_rn?.trim()) || Boolean(author?.dedication_en?.trim())
	);

	const selectedStory = $derived(selectedStoryIdx !== null ? stories[selectedStoryIdx] : null);
	const hasStorySpanish = $derived(Boolean(selectedStory?.text_spanish?.trim()));

	const storyTitle = (story: (typeof stories)[number]) =>
		showSpanish && story.title_spanish?.trim() ? story.title_spanish : story.title;

	function selectStory(index: number) {
		selectedStoryIdx = index;
	}

	function goBack() {
		selectedStoryIdx = null;
	}
</script>

{#if author}
	{#if selectedStoryIdx === null}
		<!-- Author bio + story selector -->
		<div
			class="flex flex-col items-center gap-6 text-center"
			style="font-family: 'Merriweather', serif;"
		>
			<div class="mx-auto flex w-full max-w-[60%] flex-col items-center gap-3 px-6">
				<h1 class="text-3xl font-bold">{author.name}</h1>

				{#if hasBioSpanish}
					<button
						onclick={() => (showSpanish = !showSpanish)}
						class="rounded-full bg-primary px-4 py-2 text-white shadow hover:bg-primary/80"
					>
						{showSpanish ? 'Ver en Rapa Nui' : 'Ver en Español'}
					</button>
				{/if}

				<p class="w-full whitespace-pre-line text-justify text-base leading-relaxed">
					{showSpanish && author.bio_en?.trim() ? author.bio_en : author.bio_rn}
				</p>

				{#if hasDedication}
					<div class="mt-2 w-full border-l-4 border-amber-700 pl-4 text-left italic text-amber-900">
						<p class="whitespace-pre-line text-sm">
							{showSpanish && author.dedication_en?.trim()
								? author.dedication_en
								: author.dedication_rn}
						</p>
					</div>
				{/if}

				<!-- Story selector grid -->
				<div class="mt-6 flex w-full flex-wrap justify-center gap-4">
					{#each stories as story, i (story.id)}
						<button
							class="rounded-xl border-2 border-amber-500/30 bg-amber-700 px-4 py-3 text-sm leading-snug text-white shadow-md transition-all hover:scale-105 hover:bg-amber-800 hover:shadow-lg"
							onclick={() => selectStory(i)}
						>
							{storyTitle(story)}
						</button>
					{/each}
				</div>
			</div>
		</div>
	{:else if selectedStory}
		<!-- Story detail view -->
		<div
			class="flex flex-col items-center gap-4 text-center"
			style="font-family: 'Merriweather', serif;"
		>
			<div class="mb-4 flex w-full justify-start pl-2">
				<button
					onclick={goBack}
					class="rounded-lg bg-amber-700 px-4 py-2 text-white shadow transition-colors hover:bg-amber-800"
				>
					← Volver
				</button>
			</div>

			{#if selectedStory.field}
				<img
					src={selectedStory.field}
					alt={selectedStory.image_title}
					class="max-w-full rounded-lg shadow-lg"
				/>
				{#if selectedStory.image_title}
					<p class="text-xs italic text-muted-foreground">{selectedStory.image_title}</p>
				{/if}
			{/if}

			{#if hasStorySpanish}
				<button
					onclick={() => (showSpanish = !showSpanish)}
					class="rounded-full bg-primary px-4 py-2 text-white shadow hover:bg-primary/80"
				>
					{showSpanish ? 'Ver en Rapa Nui' : 'Ver en Español'}
				</button>
			{/if}

			<h1 class="text-4xl font-bold">
				{showSpanish && selectedStory.title_spanish?.trim()
					? selectedStory.title_spanish
					: selectedStory.title}
			</h1>

			<h2 class="mb-4 mt-2 text-xl font-semibold text-amber-800">
				{author.name}
			</h2>

			<div class="mx-auto w-full max-w-[60%] px-6">
				<p class="mt-2 whitespace-pre-line text-justify text-lg leading-relaxed">
					{showSpanish && hasStorySpanish ? selectedStory.text_spanish : selectedStory.text_rapanui}
				</p>
			</div>
		</div>
	{/if}
{/if}
