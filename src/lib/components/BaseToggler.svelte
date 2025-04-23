<script lang="ts">
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import { Label } from '$lib/components/ui/label/index.js';

	let { bases, selectedBase = $bindable('Geographic') } = $props();

	const toggleBase = (base: string) => {
		selectedBase = base;
	};
</script>

<div class="m-4 flex flex-col items-center justify-center rounded-lg bg-muted p-4 shadow-lg">
	<h2 class="mb-2 text-lg font-semibold">Base</h2>
	<RadioGroup.Root value={selectedBase}>
		{#each bases as base}
			<div class="mb-2 flex items-center justify-center gap-2">
				<Label
					class="float-left text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					for={base}
				>
					{base}
				</Label>
				<RadioGroup.Item value={base} id={base} onclick={() => toggleBase(base)} />
			</div>
		{/each}
	</RadioGroup.Root>
</div>
