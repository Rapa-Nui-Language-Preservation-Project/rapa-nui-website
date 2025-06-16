<script lang="ts">
	let { bases, selectedBase = $bindable('Geographic') } = $props();
</script>

{#each bases as base}
	<div
		role="button"
		tabindex="0"
		on:click={() => selectedBase = base}
		on:keydown={(e) => e.key === 'Enter' && (selectedBase = base)}
		class={`flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-black/5 transition-colors ${
			selectedBase === base ? 'bg-orange-200 text-orange-700 font-semibold' : ''
		}`}
	>
		<!-- Radio button style indicator -->
		<div
			class={`w-3 h-3 rounded-full border-2 border-orange-700 ${
				selectedBase === base ? 'bg-orange-600' : 'bg-transparent'
			}`}
		></div>
		<span class="text-sm">{base}</span>
	</div>
{/each}