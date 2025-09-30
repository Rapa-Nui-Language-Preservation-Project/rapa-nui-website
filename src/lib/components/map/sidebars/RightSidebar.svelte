<script lang="ts">
  import BaseToggler from './toggles/BaseToggler.svelte';

  export let bases: string[] = [];
  export let selectedBase: string;
  export let visible = true;
</script>

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
