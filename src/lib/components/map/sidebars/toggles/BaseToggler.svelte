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
			selectedBase === base
				? 'bg-orange-700 font-semibold text-white hover:text-black'
				: 'text-orange bg-orange-100'
		}`}
	>
		<!-- Radio button style indicator -->
		<div
			class={`h-3 w-3 rounded-full border-2 border-orange-700 ${
				selectedBase === base ? 'bg-orange-600' : 'bg-transparent'
			}`}
		></div>
		<span class="text-sm">{base}</span>
	</div>
{/each}
