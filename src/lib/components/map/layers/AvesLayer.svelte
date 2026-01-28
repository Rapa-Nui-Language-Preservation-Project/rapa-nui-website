<script lang="ts">
	import type { ExpandedLocation } from '$lib/expanded-models';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import type { CarouselAPI } from '$lib/components/ui/carousel/context.js';

	let { location }: { location: ExpandedLocation } = $props();
	let mediaAPI = $state<CarouselAPI>();
	let mediaCurrent = $state(0);
	const mediaCount = $derived(mediaAPI ? mediaAPI.scrollSnapList().length : 0);

	// Fullscreen image state
	let showFullImage = $state(false);
	let selectedImageUrl = $state<string | null>(null);
	let selectedImageTitle = $state<string | null>(null);
	let closeButtonElement: HTMLButtonElement;

	function openFullImage(url: string, title?: string) {
		selectedImageUrl = url;
		selectedImageTitle = title || null;
		showFullImage = true;
	}

	function closeFullImage() {
		showFullImage = false;
		selectedImageUrl = null;
		selectedImageTitle = null;
	}

	// Focus management for modal
	$effect(() => {
		if (showFullImage && closeButtonElement) {
			closeButtonElement.focus();
		}
	});

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
	<div class="flex flex-col items-center justify-center px-4 text-center">
		<button
			type="button"
			onclick={() => openFullImage(location.expand.media[0].file, location.expand.media[0].title)}
			class="group relative cursor-pointer"
			style="max-width: min(100%, 70vh * 4 / 3);"
			title="Clic para ver imagen completa"
		>
			<img
				src={location.expand.media[0].file}
				alt={location.expand.media[0].description}
				class="max-h-[70vh] w-auto object-contain transition-transform group-hover:scale-[1.02]"
			/>
			<div
				class="absolute right-2 top-2 rounded-full bg-blue-600/70 p-2 opacity-0 transition-opacity group-hover:opacity-100"
			>
				<!-- magnifying glass icon -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5 text-white"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
				</svg>
			</div>
		</button>
		<p class="m-2 text-sm">{location.expand.media[0].title}</p>
	</div>
{:else if location.expand.media?.length > 1}
	<div class="flex flex-col items-center justify-center px-16 text-center">
		<Carousel.Root
			setApi={(emblaApi) => (mediaAPI = emblaApi)}
			class="flex w-fit flex-col items-center justify-center text-center"
			style="max-width: min(100%, 70vh * 4 / 3);"
		>
			<Carousel.Content>
				{#each location.expand.media || [] as media}
					<Carousel.Item class="flex flex-col items-center justify-center">
						<button
							type="button"
							onclick={() => openFullImage(media.file, media.title)}
							class="group relative cursor-pointer"
							title="Clic para ver imagen completa"
						>
							<img
								src={media.file}
								alt={media.description}
								class="max-h-[70vh] w-auto object-contain transition-transform group-hover:scale-[1.02]"
							/>
							<div
								class="absolute right-2 top-2 rounded-full bg-blue-600/70 p-2 opacity-0 transition-opacity group-hover:opacity-100"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5 text-white"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
								</svg>
							</div>
						</button>
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

<!-- Fullscreen Image Modal -->
{#if showFullImage && selectedImageUrl}
	<div
		role="dialog"
		aria-modal="true"
		aria-label="Fullscreen image viewer"
		tabindex="-1"
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
		onclick={closeFullImage}
		onkeydown={(e) => {
			if (e.key === 'Escape') {
				e.preventDefault();
				e.stopPropagation();
				closeFullImage();
			}
		}}
	>
		<button
			bind:this={closeButtonElement}
			type="button"
			aria-label="Close fullscreen image"
			class="absolute right-4 top-4 rounded-full bg-white p-2 text-black hover:bg-gray-200"
			onclick={(e) => {
				e.stopPropagation();
				closeFullImage();
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
			>
				<line x1="18" y1="6" x2="6" y2="18"></line>
				<line x1="6" y1="6" x2="18" y2="18"></line>
			</svg>
		</button>
		<img
			src={selectedImageUrl}
			alt={selectedImageTitle || 'Full size image'}
			class="max-h-full max-w-full object-contain"
			onclick={(e) => e.stopPropagation()}
		/>
	</div>
{/if}
