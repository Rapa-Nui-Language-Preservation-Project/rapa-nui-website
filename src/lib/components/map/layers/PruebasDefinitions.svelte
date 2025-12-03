<script lang="ts">
	import type { PruebasResponse } from '$lib/pocketbase-types';

	let { allPruebas, onClose }: { allPruebas: PruebasResponse[]; onClose: () => void } = $props();
</script>

<div class="fixed inset-0 top-auto z-10 flex h-full items-center justify-center bg-black/80">
	<div
		class="relative w-full max-w-2xl rounded-lg bg-gradient-to-b from-amber-50 to-orange-50 p-6 shadow-2xl"
	>
		<h2 class="mb-6 text-3xl font-bold text-amber-800">Definiciones de Pruebas</h2>

		<!-- Definitions -->
		<div class="max-h-96 space-y-4 overflow-y-auto">
			{#each allPruebas as prueba}
				<!-- Only display if there is a description in database -->
				{#if prueba.description_espanol.length < 1}
					<div></div>
					<!-- TODO: Figure out which Pruebas are missing descriptions. -->
				{:else}
					<div class="rounded-lg border-2 border-amber-200 bg-white p-4 shadow-md">
						<h3 class="mb-2 text-lg font-semibold text-amber-800">{prueba.title}</h3>
						<p class="text-gray-700">{prueba.description_espanol}</p>
					</div>
				{/if}
			{/each}
		</div>

		<!-- Close Button -->
		<button
			onclick={onClose}
			class="mt-4 rounded-lg bg-amber-700 px-4 py-2 text-white shadow transition-colors hover:bg-amber-800"
		>
			← Volver
		</button>
	</div>
</div>
