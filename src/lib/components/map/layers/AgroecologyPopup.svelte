<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import type { CarouselAPI } from '$lib/components/ui/carousel/context.js';
	import type { ExpandedLocation } from '$lib/expanded-models';

	let { location }: { location: ExpandedLocation } = $props();

	// Image carousel state
	let imageAPI = $state<CarouselAPI>();
	let imageCurrent = $state(0);
	const imageCount = $derived(imageAPI ? imageAPI.scrollSnapList().length : 0);
	let canScrollPrev = $state(false);
	let canScrollNext = $state(false);

	$effect(() => {
		if (imageAPI) {
			const handleSelect = () => {
				imageCurrent = imageAPI!.selectedScrollSnap() + 1;
				canScrollPrev = imageAPI!.canScrollPrev();
				canScrollNext = imageAPI!.canScrollNext();
			};

			imageAPI.on('select', handleSelect);
			imageCurrent = imageAPI.selectedScrollSnap() + 1;
			canScrollPrev = imageAPI.canScrollPrev();
			canScrollNext = imageAPI.canScrollNext();

			return () => {
				//Cleanup function to prevent memory leaks
				imageAPI!.off('select', handleSelect);
			};
		}
	});

	// Tab state
	let activeTab = $state<'info' | 'taxonomy' | 'citations'>('info');

	// Image modal state
	let showImageModal = $state(false);
	let modalImageSrc = $state('');
	let modalImageTitle = $state('');

	function openImageModal(src: string, title: string) {
		modalImageSrc = src;
		modalImageTitle = title;
		showImageModal = true;
	}

	function closeImageModal() {
		showImageModal = false;
	}

	// Get agroecology data from expanded relation
	const agroPage = $derived(location.expand?.agroecology);
	const images = $derived(
		(agroPage?.expand?.images || []).slice().sort((a, b) => (a.order || 0) - (b.order || 0))
	);
	const taxonomyRows = $derived(agroPage?.expand?.taxonomy_rows || []);

	// Get the current image
	const currentImage = $derived.by(() => {
		if (images.length === 0) return null;
		const index = imageCurrent - 1; // imageCurrent is 1-indexed
		return images[index] || images[0];
	});

	// Get the current taxonomy row based on the current image's linked taxonomy
	const currentTaxonomyRow = $derived.by(() => {
		const img = currentImage;
		if (!img) return null;

		// If image has a linked taxonomy, find it
		if (img.taxonomy && taxonomyRows.length > 0) {
			return taxonomyRows.find((row) => row.id === img.taxonomy) || null;
		}

		return null;
	});

	// Check if current image has taxonomy data (for showing/hiding the tab)
	const hasTaxonomy = $derived(currentTaxonomyRow !== null);

	// Auto-switch to info tab if taxonomy tab is active but no taxonomy exists
	$effect(() => {
		if (activeTab === 'taxonomy' && !hasTaxonomy) {
			activeTab = 'info';
		}
	});
</script>

<div class="agroecology-wrapper flex h-full max-w-full flex-col overflow-hidden md:flex-row">
	<!-- Left Panel - Images -->
	<div class="flex flex-col bg-amber-100/50 p-6 md:w-1/2 md:self-start">
		{#if images.length > 0}
			<div class="relative mb-4">
				<Carousel.Root setApi={(emblaApi) => (imageAPI = emblaApi)} class="w-full">
					<Carousel.Content class="h-full">
						{#each images as image}
							<Carousel.Item class="flex h-full items-center justify-center">
								<div class="relative h-[400px] w-full md:h-[500px]">
									<button
										onclick={() => openImageModal(image.file ?? '', image.title ?? '')}
										class="group relative h-full w-full cursor-pointer"
										title="Clic para ver imagen completa"
									>
										<img
											src={image.file}
											alt={image.title || ''}
											class="h-full w-full rounded-lg object-contain transition-transform group-hover:scale-[1.02]"
										/>
										<div
											class="absolute right-2 top-2 rounded-full bg-amber-900/70 p-2 opacity-0 transition-opacity group-hover:opacity-100"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="h-5 w-5 text-white"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
												/>
											</svg>
										</div>
									</button>
									{#if image.title}
										<div
											class="pointer-events-none absolute bottom-0 left-0 right-0 rounded-b-lg bg-gradient-to-t from-amber-900/80 to-transparent p-4"
										>
											<p class="font-serif text-sm text-amber-50">{image.title}</p>
										</div>
									{/if}
								</div>
							</Carousel.Item>
						{/each}
					</Carousel.Content>
					{#if canScrollPrev}
						<Carousel.Previous class="left-4" variant="secondary" />
					{/if}
					{#if canScrollNext}
						<Carousel.Next class="right-4" variant="secondary" />
					{/if}
				</Carousel.Root>
			</div>
			{#if images.length > 1}
				<div class="py-2 text-center text-sm text-amber-700">
					{imageCurrent} de {imageCount}
				</div>
			{/if}
		{:else}
			<div class="flex h-full items-center justify-center">
				<p class="text-amber-600">No hay imágenes disponibles</p>
			</div>
		{/if}
	</div>

	<!-- Right Panel - Content -->
	<div class="flex min-w-0 max-w-full flex-col overflow-hidden md:w-1/2">
		<!-- Header -->
		<div class="overflow-hidden border-b border-amber-200 p-6">
			<!-- Rapa Nui Name (Large Title) -->
			{#if agroPage?.plantName}
				<h2 class="break-words font-serif text-3xl font-bold text-amber-900">
					{agroPage.plantName}
				</h2>
			{/if}

			<!-- Spanish Name -->
			{#if agroPage?.spanishName}
				<p class="mt-3 text-sm font-medium text-amber-700">ʻInoa Paniora</p>
				<p class="break-words text-lg font-semibold text-amber-800">{agroPage.spanishName}</p>
			{/if}

			<!-- Scientific Name -->
			{#if agroPage?.scientificName}
				<p class="mt-3 text-sm font-medium text-amber-700">ʻInoa ʻi te Āo</p>
				<p class="break-words text-lg italic text-amber-700">{agroPage.scientificName}</p>
			{/if}
		</div>

		<!-- Tabs -->
		<div class="flex border-b border-amber-200">
			<button
				onclick={() => (activeTab = 'info')}
				class={`flex-1 py-3 text-sm font-medium transition-colors ${
					activeTab === 'info'
						? 'border-b-2 border-orange-600 text-orange-600'
						: 'text-amber-600 hover:text-amber-900'
				}`}
			>
				Descripción de la Planta
			</button>
			{#if hasTaxonomy}
				<button
					onclick={() => (activeTab = 'taxonomy')}
					class={`flex-1 py-3 text-sm font-medium transition-colors ${
						activeTab === 'taxonomy'
							? 'border-b-2 border-orange-600 text-orange-600'
							: 'text-amber-600 hover:text-amber-900'
					}`}
				>
					Clasificación de Plagas
				</button>
			{/if}
			<button
				onclick={() => (activeTab = 'citations')}
				class={`flex-1 py-3 text-sm font-medium transition-colors ${
					activeTab === 'citations'
						? 'border-b-2 border-orange-600 text-orange-600'
						: 'text-amber-600 hover:text-amber-900'
				}`}
			>
				Citas
			</button>
		</div>

		<!-- Tab Content -->
		<div class="flex-1 overflow-x-hidden p-6">
			{#if activeTab === 'info'}
				{#if agroPage?.description}
					<p class="break-words leading-relaxed text-amber-900">{agroPage.description}</p>
				{:else}
					<p class="text-amber-600">No hay información disponible</p>
				{/if}
			{:else if activeTab === 'taxonomy'}
				{@const row = currentTaxonomyRow}
				{#if row}
					<div class="space-y-4">
						{#if agroPage?.taxonomyTitle}
							<div class="rounded-t bg-orange-600 py-2 text-center text-sm font-medium text-white">
								{agroPage.taxonomyTitle}
							</div>
						{/if}
						<div class="rounded border border-amber-200 bg-amber-50/50 p-4">
							<div class="space-y-2 text-sm">
								{#if row.nombreComun}
									<div class="flex justify-between">
										<span class="font-medium text-amber-700">Nombre común</span>
										<span class="text-amber-900">{row.nombreComun}</span>
									</div>
								{/if}
								{#if row.tipo}
									<div class="flex justify-between">
										<span class="font-medium text-amber-700">Tipo</span>
										<span class="text-amber-900">{row.tipo}</span>
									</div>
								{/if}
								{#if row.orden}
									<div class="flex justify-between">
										<span class="font-medium text-amber-700">Orden</span>
										<span class="text-amber-900">{row.orden}</span>
									</div>
								{/if}
								{#if row.familia}
									<div class="flex justify-between">
										<span class="font-medium text-amber-700">Familia</span>
										<span class="text-amber-900">{row.familia}</span>
									</div>
								{/if}
								{#if row.genero}
									<div class="flex justify-between">
										<span class="font-medium text-amber-700">Género</span>
										<span class="text-amber-900">{row.genero}</span>
									</div>
								{/if}
								{#if row.especie}
									<div class="flex justify-between">
										<span class="font-medium text-amber-700">Especie</span>
										<span class="italic text-amber-900">{row.especie}</span>
									</div>
								{/if}
							</div>
						</div>
					</div>
				{/if}
			{:else if activeTab === 'citations'}
				{#if agroPage?.citations}
					<div class="whitespace-pre-line leading-relaxed text-amber-900">
						{agroPage.citations}
					</div>
				{:else}
					<p class="text-amber-600">No hay citas disponibles</p>
				{/if}
			{/if}
		</div>
	</div>
</div>

<!-- Image Modal -->
{#if showImageModal}
	<div
		class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
		onclick={closeImageModal}
		role="button"
		tabindex="0"
		onkeydown={(e) => e.key === 'Escape' && closeImageModal()}
	>
		<button
			onclick={closeImageModal}
			class="absolute right-4 top-4 rounded-full bg-amber-900/80 p-2 text-white transition-colors hover:bg-amber-800"
			title="Cerrar"
			aria-label="Cerrar"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		</button>
		<div
			class="max-h-full max-w-full"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
		>
			<img
				src={modalImageSrc}
				alt={modalImageTitle}
				class="max-h-[90vh] max-w-full object-contain"
			/>
			{#if modalImageTitle}
				<p class="mt-4 text-center font-serif text-lg text-white">{modalImageTitle}</p>
			{/if}
		</div>
	</div>
{/if}
