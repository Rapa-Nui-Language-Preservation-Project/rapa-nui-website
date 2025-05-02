<script lang="ts">
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	let { bases, selectedBase = $bindable('Geographic') } = $props();
	const toggleBase = (base: string) => {
		selectedBase = base;
	};
</script>

<RadioGroup.Root value={selectedBase} class="">
	{#each bases as base}
		<div class="flex w-full items-center justify-between">
			<Label for={base}>
				{base}
			</Label>
			<RadioGroup.Item
				class="border-2 border-white"
				value={base}
				id={base}
				onclick={() => toggleBase(base)}
			/>
		</div>
	{/each}
</RadioGroup.Root>
