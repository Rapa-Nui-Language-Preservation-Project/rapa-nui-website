<script lang="ts">
	import BaseToggler from './toggles/BaseToggler.svelte';
	import LayerToggler from './toggles/LayerToggler.svelte';

	let {
		selectedBase = $bindable(),
		bases = [],
		layers = [],
		selectedLayerId = $bindable(),
		showMacroInfo = $bindable(false),
		visible = true
	} = $props();

	const rightLayers = $derived(layers.filter((layer) => layer.isRight));
</script>

<div
	class={`fixed right-0 top-0 h-full w-80 overflow-y-auto overflow-x-hidden border-l border-black/10 bg-gradient-to-b from-amber-50 to-orange-50 font-serif text-amber-900 transition-all duration-500 ease-in-out 
  ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-full opacity-0'}`}
	style="font-family: 'Merriweather', serif;"
>
	<div class="p-6">
		<div class="space-y-4 pb-6">
			<BaseToggler {bases} bind:selectedBase />
		</div>
		<div class="space-y-2">
			<LayerToggler layers={rightLayers} bind:selectedLayerId bind:showMacroInfo />
		</div>
		<div class="group relative mt-4 overflow-hidden rounded-lg px-6 py-1">
			<div
				class="absolute left-0 top-0 h-full w-1.5 scale-y-0 bg-orange-600 transition-transform duration-300 ease-out group-hover:scale-y-100"
			></div>
			<p
				class="mb-1 text-lg font-medium text-amber-900 transition-colors duration-200 group-hover:text-orange-600"
			>
				Mai ki Hāpī Tātou
			</p>
			<a
				href="/lenguaje"
				class="group relative my-2 block aspect-[16/10] overflow-hidden rounded bg-white"
			>
				<img
					src="/language/mai-ki-hapi-tatou-salmon-cover.png"
					alt="Mai ki Hāpī Tātou - Materiales de aprendizaje de Rapa Nui"
					class="h-full w-full object-contain transition-transform duration-300 ease-in-out group-hover:scale-105"
				/>
			</a>
		</div>
	</div>
</div>
