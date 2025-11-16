<script lang="ts">
	import type { PruebasResponse } from '$lib/pocketbase-types';

	let { allPruebas, onClose }: { allPruebas: PruebasResponse[]; onClose: () => void } = $props();
</script>

<div class="z-100 fixed inset-0 top-auto flex items-center justify-center bg-black/80">
	<div
		class="relative w-full max-w-2xl rounded-lg bg-gradient-to-b from-amber-50 to-orange-50 p-6 shadow-2xl"
	>
		<!-- Close Button -->
		<button
			onclick={onClose}
			class="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-lg hover:bg-white"
		>
			✕
		</button>

		<h2 class="mb-6 text-3xl font-bold text-amber-800">Definiciones de Pruebas</h2>

		<!-- Definitions -->
		<div class="max-h-96 space-y-4 overflow-y-auto">
			{#each allPruebas as prueba}
				{#if prueba.description_espanol.length < 1}
					<div></div>
				{:else}
					<div class="rounded-lg border-2 border-amber-200 bg-white p-4 shadow-md">
						<h3 class="mb-2 text-lg font-semibold text-amber-800">{prueba.title}</h3>
						<p class="text-gray-700">{prueba.description_espanol}</p>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</div>
