<script lang="ts">
	import Map from '$lib/Map.svelte';
	import { fade, scale } from 'svelte/transition';
	let show = $state(true);

	function handleBackgroundClick(event: Event) {
		if (event.target === event.currentTarget) {
			show = false;
		}
		event.stopPropagation();
	}
</script>

<main class="relative h-screen overflow-hidden">
	{#if show}
		<button
			aria-label="background"
			class="absolute inset-0 z-[5] bg-black/5 backdrop-blur-xs"
			transition:fade={{ duration: 500 }}
			onclick={handleBackgroundClick}
		></button>
		<dialog
			open
			class="absolute top-1/3 left-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center rounded-lg border-2 border-gray-100 bg-gray-900/20 bg-clip-padding p-6 text-white shadow-lg backdrop-blur-md"
			transition:scale={{ duration: 400, start: 0.95, opacity: 0 }}
		>
			<h1 class="mb-2 text-5xl"><b>Rapa Nui</b> Preservation</h1>
			<h2 class="mb-12 self-start text-2xl">digital archive</h2>
			<p class="mx-auto mb-12 w-full max-w-md break-words">
				We could put some kind of information about the project here, for now it is just placeholder
				text that creates visual balance between the titles and the buttons
			</p>
			<div class="flex flex-row gap-6 text-xs">
				<a href="/locations" class="bouncy blurry bg-secondary/40 text-white">Locations API Test</a>
				<button class="bouncy bg-primary/40 blurry text-white" onclick={() => (show = !show)}>
					Expore
				</button>
			</div>
		</dialog>
	{/if}
	<Map modal={() => (show = true)} />
</main>

