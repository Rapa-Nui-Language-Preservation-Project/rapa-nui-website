<script lang="ts">
	import type { ExpandedLayer } from '$lib/expanded-models';
	import LayerToggler from './toggles/LayerToggler.svelte';
	import { MediaQuery } from 'svelte/reactivity';

	export let layers: ExpandedLayer[] = [];
	export let selectedLayers: Map<string, ExpandedLayer>;
	export let visible = true;

	const isDesktop = new MediaQuery('(min-width: 768px)');
</script>

{#if isDesktop.current}
	<div
		class={`fixed left-0 top-0 z-20 h-full w-96 overflow-y-auto border-r border-black/10 bg-gradient-to-b from-amber-50 to-orange-50 font-serif text-amber-900 transition-all duration-500 ease-in-out 
      ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'} hidden md:block`}
		style="font-family: 'Merriweather', serif;"
	>
		<div class="p-6">
			<div class="space-y-2">
				<LayerToggler {layers} bind:selectedLayers />
			</div>
		</div>
	</div>
{:else}
	<div></div>
{/if}
