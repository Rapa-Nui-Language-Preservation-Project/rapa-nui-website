<script lang="ts">
	let { bases, selectedBase = $bindable('Rapa Nui') } = $props();
</script>

{#each bases as base}
	<div
		role="button"
		tabindex="0"
		onclick={() => (selectedBase = base)}
		onkeydown={(e) => e.key === 'Enter' && (selectedBase = base)}
		class={`flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-black/5 ${
			selectedBase === base ? 'bg-orange-200 font-semibold text-orange-700' : ''
		}`}
	>
		<!-- Radio button style indicator -->
		<div
			class={`h-3 w-3 rounded-full border-2 border-orange-700 ${
				selectedBase === base ? 'bg-orange-600' : 'bg-transparent'
			}`}
		></div>
		<span class="text-xs">{base}</span>
	</div>
{/each}

