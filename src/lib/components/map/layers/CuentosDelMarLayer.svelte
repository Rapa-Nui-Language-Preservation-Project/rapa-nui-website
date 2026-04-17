<script lang="ts">
	import type { ExpandedLocation } from '$lib/expanded-models';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import type { CarouselAPI } from '$lib/components/ui/carousel/context.js';

	let { location }: { location: ExpandedLocation } = $props();

	// Detect location type from media records
	const coverImage = $derived(location.expand?.media?.find((m) => m.type === 'image'));
	const pdfMedia = $derived(location.expand?.media?.filter((m) => m.type === 'pdf') ?? []);
	const isFlipbook = $derived(!!coverImage);
	const isNews = $derived(location.name === 'Te Mau o Te Vaikava');

	// Newsletter carousel state (for future multiple issues)
	let newsAPI = $state<CarouselAPI>();
	const newsCount = $derived(newsAPI ? newsAPI.scrollSnapList().length : 0);
	let newsCurrent = $state(0);

	$effect(() => {
		if (newsAPI) {
			newsCurrent = newsAPI.selectedScrollSnap() + 1;
			newsAPI.on('select', () => {
				newsCurrent = newsAPI!.selectedScrollSnap() + 1;
			});
		}
	});
</script>

<!-- ── FLIPBOOK COVER ──────────────────────────────────────────────────────── -->
{#if isFlipbook}
	<div class="flex flex-col items-center gap-4 px-4 py-2 text-center">
		<h1 class="text-xl font-bold">{location.name}</h1>
		<p class="text-sm italic text-amber-700">{location.description_espanol}</p>

		<a
			href={location.description_rapa_nui}
			target="_blank"
			rel="noopener noreferrer"
			class="group relative block"
			title="Abrir flipbook en nueva pestaña"
		>
			<img
				src={coverImage!.file}
				alt={coverImage!.title}
				class="max-h-[60vh] w-auto rounded-lg border-2 border-amber-300 shadow-lg transition-transform group-hover:scale-[1.02]"
			/>
			<div
				class="absolute inset-0 flex items-end justify-center rounded-lg bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
			>
				<span
					class="mb-4 rounded-full bg-amber-600 px-4 py-2 text-sm font-semibold text-white shadow"
				>
					Abrir flipbook →
				</span>
			</div>
		</a>

		<p class="text-xs text-muted-foreground">
			Haz clic en la portada para abrir el libro interactivo
		</p>
	</div>

	<!-- ── NEWSLETTER ─────────────────────────────────────────────────────────── -->
{:else if isNews}
	<div class="flex w-full flex-col items-center gap-4 px-4 py-2">
		<h1 class="text-xl font-bold">{location.name}</h1>
		<p class="text-sm text-amber-700">{location.description_espanol}</p>

		{#if pdfMedia.length === 1}
			<p class="text-xs italic text-muted-foreground">{pdfMedia[0].title}</p>
			<iframe
				src={pdfMedia[0].file}
				title={pdfMedia[0].title}
				class="h-[65vh] w-full rounded-lg border border-amber-200 shadow-lg"
			></iframe>
		{:else if pdfMedia.length > 1}
			<Carousel.Root setApi={(emblaApi) => (newsAPI = emblaApi)} class="w-full">
				<Carousel.Content>
					{#each pdfMedia as pdf}
						<Carousel.Item class="flex flex-col items-center gap-2">
							<p class="text-xs italic text-muted-foreground">{pdf.title}</p>
							<iframe
								src={pdf.file}
								title={pdf.title}
								class="h-[65vh] w-full rounded-lg border border-amber-200 shadow-lg"
							></iframe>
						</Carousel.Item>
					{/each}
				</Carousel.Content>
				<Carousel.Previous variant="secondary" />
				<Carousel.Next variant="secondary" />
			</Carousel.Root>
			<div class="text-center text-sm text-muted-foreground">
				{newsCurrent} de {newsCount}
			</div>
		{/if}
	</div>

	<!-- ── SHORT STORY ────────────────────────────────────────────────────────── -->
{:else}
	<div class="flex w-full flex-col items-center gap-3 px-4 py-2">
		<div class="text-center">
			<h1 class="text-xl font-bold">{location.name}</h1>
			{#if location.description_espanol}
				<p class="mt-1 text-sm italic text-amber-700">{location.description_espanol}</p>
			{/if}
		</div>

		{#if pdfMedia.length > 0}
			<iframe
				src={pdfMedia[0].file}
				title={location.name}
				class="h-[70vh] w-full rounded-lg border border-amber-200 shadow-lg"
			></iframe>
		{/if}
	</div>
{/if}
