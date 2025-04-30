<script lang="ts">
	import { type ExpandedLayer } from '$lib/expanded-models';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';

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
	<div class="flex items-center justify-end">
		<Label>
			{layer.name}
		</Label>
		<Checkbox class="ml-4" onclick={() => toggleLayer(layer)} />
	</div>
{/each}
