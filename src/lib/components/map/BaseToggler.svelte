<script lang="ts">
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	let { bases, selectedBase = $bindable('Geographic') } = $props();
	const toggleBase = (base: string) => {
		selectedBase = base;
	};
</script>

<RadioGroup.Root value={selectedBase} class="gap-3">
	{#each bases as base}
		<div class="flex">
			<Label class="" for={base}>
				{base}
			</Label>
			<RadioGroup.Item class="ml-auto" value={base} id={base} onclick={() => toggleBase(base)} />
		</div>
	{/each}
</RadioGroup.Root>
