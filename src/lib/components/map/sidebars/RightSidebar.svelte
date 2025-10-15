<script lang="ts">
  import BaseToggler from './toggles/BaseToggler.svelte';
	import { MediaQuery } from 'svelte/reactivity';

  export let bases: string[] = [];
  export let selectedBase: string;
  export let visible = true;

  const isDesktop = new MediaQuery("(min-width: 768px)");
</script>

<!--Desktop View-->
{#if isDesktop.current}
  <div
    class={`fixed right-0 top-0 z-20 h-full w-80 overflow-y-auto border-l border-black/10 bg-gradient-to-b from-amber-50 to-orange-50 font-serif text-amber-900 transition-all duration-500 ease-in-out 
    ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-full opacity-0'}`}
    style="font-family: 'Merriweather', serif;"
  >
    <div class="p-6">
      <h2 class="mb-8 text-center text-2xl font-bold tracking-wider">Mapas</h2>
      <div class="space-y-4">
        <BaseToggler {bases} bind:selectedBase />
      </div>
    </div>
  </div>
<!--Mobile View-->  
{:else}
  <div
    class={`fixed right-0 top-0 z-20 w-30 h-42 overflow-y-auto border-l border-black/10 bg-gradient-to-b from-amber-50 to-orange-50 font-serif text-amber-900 transition-all duration-500 ease-in-out 
    ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-full opacity-0'}`}
    style="font-family: 'Merriweather', serif;"
  >
    <div class="p-1">
      <h2 class="mb-1 text-center text-lg font-bold tracking-wider">Mapas</h2>
      <div>
        <BaseToggler {bases} bind:selectedBase />
      </div>
    </div>
  </div>
{/if}
<div
	class={`fixed right-0 top-0 z-20 h-full w-80 overflow-y-auto border-l border-black/10 bg-gradient-to-b from-amber-50 to-orange-50 font-serif text-amber-900 transition-all duration-500 ease-in-out 
  ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-full opacity-0'}`}
	style="font-family: 'Merriweather', serif;"
>
	<div class="p-6">
		<div class="space-y-4">
			<BaseToggler {bases} bind:selectedBase />
		</div>
	</div>
	<div
		class="fixed bottom-0 right-0 m-4 mx-12 rounded outline-4 outline-orange-600 transition-all duration-100 ease-in-out hover:outline"
	>
		<a href="/InaKoMou.pdf">
			<img src="/InaKoMouCover.png" alt="Ina Ko Mou Cover" />
		</a>
	</div>
</div>
