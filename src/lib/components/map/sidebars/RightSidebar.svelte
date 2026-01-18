<script lang="ts">
	import BaseToggler from './toggles/BaseToggler.svelte';
	import LayerToggler from './toggles/LayerToggler.svelte';
	import type { ExpandedLayer } from '$lib/expanded-models';

	let {
		selectedBase = $bindable(),
		bases = [],
		layers = [],
		selectedLayerId = $bindable(),
		visible = true
	} = $props();

	const rightLayers = $derived(layers.filter((layer) => layer.isRight));
</script>

<div
	class={`fixed right-0 top-0 h-full w-80 overflow-x-hidden overflow-y-auto border-l border-black/10 bg-gradient-to-b from-amber-50 to-orange-50 font-serif text-amber-900 transition-all duration-500 ease-in-out 
  ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-full opacity-0'}`}
	style="font-family: 'Merriweather', serif;"
>
	<div class="p-6">
		<div class="space-y-4 pb-2">
			<BaseToggler {bases} bind:selectedBase />
		</div>
		<div class="space-y-2">
			<LayerToggler layers={rightLayers} bind:selectedLayerId />
		</div>
		<div
			class="relative bottom-0 right-0 m-4 mx-auto rounded outline-4 outline-orange-600 transition-all duration-100 ease-in-out hover:outline"
		>
			<a href="/InaKoMou.pdf">
				<img src="/InaKoMouCover.png" alt="Ina Ko Mou Cover" class="max-w-full" />
			</a>
		</div>
	</div>
</div>
