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

<div class="m-2 flex flex-col items-center justify-center bg-muted p-2">
	<h2 class="mb-2 text-lg font-semibold">Layers</h2>
	{#each layers as layer}
		<div class="mb-2 flex items-end justify-end gap-2 w-full">
			<Label
				class="float-left text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
			>
				{layer.name}
			</Label>
			<Checkbox onclick={() => toggleLayer(layer)} />
		</div>
	{/each}
</div>
