<script lang="ts">
	import { type ExpandedLayer } from '$lib/expanded-models';

	let { layers, selectedLayers = $bindable() } = $props();

	const toggleLayer = (layer: ExpandedLayer) => {
		const newSelectedLayers = new Map(selectedLayers);
		if (newSelectedLayers.has(layer.id)) {
			newSelectedLayers.delete(layer.id);
		} else {
			newSelectedLayers.set(layer.id, layer);
		}
		selectedLayers = newSelectedLayers;
	};
</script>

{#each layers as layer}
	<div
		role="button"
		tabindex="0"
		onclick={() => toggleLayer(layer)}
		onkeydown={(e) => e.key === 'Enter' && toggleLayer(layer)}
		class="group relative cursor-pointer overflow-hidden rounded-lg px-6 py-1"
	>
		<!-- Color flow selection bar -->
		<div
			class={`absolute left-0 top-0 h-full w-1.5 bg-orange-600 transition-transform duration-300 ease-out ${
				selectedLayers.has(layer.id) ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'
			}`}
		></div>

		<!-- Layer name -->
		<h3
			class="mb-1 text-lg font-medium text-amber-900 transition-colors duration-200 group-hover:text-orange-600"
		>
			{layer.name}
		</h3>

		<!-- Description -->
		{#if layer.description}
			<p class="text-xs leading-relaxed text-amber-900 opacity-80">
				{layer.description}
			</p>
		{/if}

		<!-- Cover photo -->
		{#if layer.cover_photo && layer.cover_photo.length > 0}
			<div class="relative my-2 aspect-[16/10] overflow-hidden rounded bg-white">
				<img
					src={`http://127.0.0.1:8090/api/files/layers/${layer.id}/${layer.cover_photo[0]}`}
					alt={`Cover photo for ${layer.name}`}
					class={`h-full w-full object-contain transition-transform duration-300 ease-in-out group-hover:scale-105 ${
						selectedLayers.has(layer.id)
							? 'ring-2 ring-orange-500 ring-offset-2 ring-offset-amber-50'
							: ''
					}`}
				/>
			</div>
		{/if}
	</div>
{/each}
