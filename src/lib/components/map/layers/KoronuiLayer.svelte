<script lang="ts">
	import type { ExpandedLocation } from '$lib/expanded-models';
	let { location }: { location: ExpandedLocation } = $props();
	let showSpanish = $state(false);
	let selectedActividadIdx = $state<number | null>(null);
	let showFull = $state(false);
	let selectedFullImage = $state<string | null>(null);

	const posClasses = [
		'left-1/2 top-0  -translate-x-1/2 -translate-y-1/2',
		'right-0  top-1/2  translate-x-1/2 -translate-y-1/2',
		'left-1/2 bottom-0 -translate-x-1/2  translate-y-1/2',
		'left-0  top-1/2  -translate-x-1/2 -translate-y-1/2'
	];

	function selectActividad(index: number) {
		selectedActividadIdx = index;
	}

	function goBack() {
		selectedActividadIdx = null;
	}

	const selectedActivity = $derived(
		selectedActividadIdx !== null ? location.expand?.actividad[selectedActividadIdx] : null
	);
	const mediaImages = $derived(selectedActivity?.expand?.media || []);
	const pruebas = $derived(
		Array.isArray(selectedActivity?.pruebas) ? selectedActivity.pruebas : []
	);
	const mapa = $derived(selectedActivity?.mapa || '');

	function openFullImage(url: string) {
		selectedFullImage = url;
		showFull = true;
	}

	function closeFullImage() {
		showFull = false;
		selectedFullImage = null;
	}
</script>

<svelte:head>
	<style>
		@keyframes marquee {
			0% {
				transform: translateX(0);
			}
			100% {
				transform: translateX(-50%);
			}
		}
		@keyframes marquee-reverse {
			0% {
				transform: translateX(-50%);
			}
			100% {
				transform: translateX(0);
			}
		}
		.animate-marquee {
			animation: marquee 30s linear infinite;
		}
		.animate-marquee-reverse {
			animation: marquee-reverse 25s linear infinite;
		}
	</style>
</svelte:head>

{#if showFull && selectedFullImage}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/80"
		role="button"
		tabindex="0"
		aria-label="Cerrar imagen ampliada"
		onclick={closeFullImage}
		onkeydown={(e) => {
			if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') closeFullImage();
		}}
	>
		<div class="relative flex h-full w-full items-center justify-center p-4">
			<img
				src={selectedFullImage}
				alt="Imagen ampliada"
				class="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
			/>
			<button
				class="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-lg hover:bg-white"
			>
				✕
			</button>
		</div>
	</div>
{/if}

{#if selectedActividadIdx === null}
	<h1 class="text-xl font-bold">{location.name}</h1>
	<div class="relative p-4 text-center text-foreground">
		<p class="preserve-whitespace mt-2">
			{showSpanish ? location.description_espanol : location.description_rapa_nui}
		</p>

		<!-- Button to toggle the language of the description -->
		<button
			onclick={() => (showSpanish = !showSpanish)}
			class="mt-4 rounded-full bg-primary px-4 py-2 text-primary-foreground shadow hover:bg-primary/80"
		>
			{showSpanish ? 'Ver en Rapa Nui' : 'Ver en Español'}
		</button>
	</div>

	<div class="relative mx-auto mb-16 mt-16 h-32 w-64">
		<div class="absolute inset-0 rounded-full border-2 border-amber-500 opacity-30"></div>

		{#each location.expand?.actividad ?? [] as act, i (act.id)}
			<button
				class={`absolute ${posClasses[i]}
                rounded-full bg-amber-700 px-6
                py-3 text-white shadow-lg hover:bg-amber-800`}
				onclick={() => selectActividad(i)}
			>
				{act.title}
			</button>
		{/each}
	</div>
{:else}
	<div class="mb-4 text-left">
		<button
			onclick={goBack}
			class="rounded-lg bg-amber-700 px-4 py-2 text-white shadow transition-colors hover:bg-amber-800"
		>
			← Volver
		</button>
	</div>
	<!-- Top Marquee -->
	<div class="w-full overflow-hidden border-b border-amber-200 bg-amber-100/50 py-6">
		<div class="flex animate-marquee space-x-6">
			{#each [...mediaImages, ...mediaImages] as media}
				<div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
					<button
						type="button"
						onclick={() => openFullImage(media.file)}
						class="h-full w-full cursor-zoom-in border-0 bg-transparent p-0"
						aria-label={`Ver imagen: ${media.title}`}
					>
						<img
							src={media.file}
							alt={media.title}
							class="h-full w-full rounded-lg border-2 border-amber-300 object-cover shadow-md"
						/>
					</button>
				</div>
			{/each}
		</div>
	</div>

	<!-- Main Content Area -->
	<div class="space-y-3 p-2 text-center">
		<!-- Title Section -->
		<div class="py-2 text-center">
			<h1 class="text-7xl font-bold text-amber-800">{selectedActivity?.title || 'ACTIVIDAD'}</h1>
		</div>

		<!-- First Row - Participantes and Map -->
		<div class="text-justified-center grid grid-cols-12 gap-8">
			<div
				class="col-span-7 flex items-center rounded-lg border border-amber-200 bg-white/90 p-2 shadow-lg backdrop-blur-sm"
			>
				<p class="leading-relaxed text-gray-700">
					{selectedActivity?.description_espanol || 'Descripción no disponible.'}
				</p>
			</div>

			<div
				class="col-span-5 rounded-lg border border-amber-200 bg-white/90 p-6 shadow-lg backdrop-blur-sm"
			>
				<div class="relative h-64 w-full">
					<button
						type="button"
						onclick={() => openFullImage(mapa)}
						class="h-full w-full cursor-zoom-in border-0 bg-transparent p-0"
						aria-label="Ver mapa ampliado"
					>
						<img
							src={mapa}
							alt="Mapa de Rapa Nui"
							class="h-full w-full rounded-lg object-contain"
						/>
					</button>
				</div>
			</div>
		</div>

		<!-- Second Row - Description -->
		<div class="rounded-lg border border-amber-200 bg-white/90 p-4 shadow-lg backdrop-blur-sm">
			<h3 class="mb-2 text-lg font-semibold text-amber-800">Participantes</h3>
			<p class="text-gray-700">{selectedActivity?.participantes}</p>
		</div>

		<!-- Third Row - Pruebas -->
		<div class="rounded-lg border border-amber-200 bg-white/90 p-4 shadow-lg backdrop-blur-sm">
			<h3 class="mb-4 text-lg font-semibold text-amber-800">Pruebas</h3>
			<div class="grid-items-center grid grid-cols-2 gap-4 md:grid-cols-3">
				{#if pruebas.length === 0}
					<p class="text-gray-500">No hay pruebas disponibles para esta actividad.</p>
				{/if}
				{#each pruebas as prueba}
					<div class="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-gray-700">
						{prueba}
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Bottom Marquee -->
	<div class="w-full overflow-hidden border-t border-amber-200 bg-amber-100/50 py-6">
		<div class="animate-marquee-reverse flex space-x-6">
			{#each [...mediaImages, ...mediaImages] as media}
				<div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
					<button
						type="button"
						onclick={() => openFullImage(media.file)}
						class="h-full w-full cursor-zoom-in border-0 bg-transparent p-0"
						aria-label={`Ver imagen: ${media.title}`}
					>
						<img
							src={media.file}
							alt={media.title}
							class="h-full w-full rounded-lg border-2 border-amber-300 object-cover shadow-md"
						/>
					</button>
				</div>
			{/each}
		</div>
	</div>
{/if}
