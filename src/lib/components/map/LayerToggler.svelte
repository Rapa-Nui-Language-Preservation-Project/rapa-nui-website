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
		class="px-6 py-1 rounded-lg cursor-pointer group relative overflow-hidden"
	>
		<!-- Color flow selection bar -->
		<div 
			class={`absolute top-0 left-0 h-full w-1.5 bg-orange-600 transition-transform duration-300 ease-out ${
				selectedLayers.has(layer.id) ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'
			}`}
		></div>
		
		<!-- Layer name -->
		<h3 class="font-medium text-lg mb-1 text-amber-900 group-hover:text-orange-600 transition-colors duration-200">
			{layer.name}
		</h3>
		
		<!-- Description -->
		{#if layer.description}
			<p class="text-xs text-amber-900 opacity-80 leading-relaxed">
				{layer.description}
			</p>
		{/if}

		<!-- Cover photo -->
		<!-- Cover photo -->
{#if layer.cover_photo && layer.cover_photo.length > 0}
<div class="my-2 rounded overflow-hidden aspect-[16/10] relative bg-white">
	<img 
		src={`http://127.0.0.1:8090/api/files/layers/${layer.id}/${layer.cover_photo[0]}`} 
		alt={`Cover photo for ${layer.name}`}
		class={`w-full h-full object-contain transition-transform duration-300 ease-in-out group-hover:scale-105 ${
			selectedLayers.has(layer.id) ? 'ring-2 ring-orange-500 ring-offset-2 ring-offset-amber-50' : ''
		}`}
	/>
</div>
{/if}
	</div>
{/each}