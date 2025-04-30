<script lang="ts">
	import { type Layer } from '$lib/models';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';

	let { layers, selectedLayers = $bindable() } = $props();

	const toggleLayer = (layer: Layer) => {
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
	<div class="flex">
		<Label>
			{layer.name}
		</Label>
		<Checkbox class="ml-auto" onclick={() => toggleLayer(layer)} />
	</div>
{/each}
