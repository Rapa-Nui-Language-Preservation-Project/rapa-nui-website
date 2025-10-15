<script lang="ts">
  import type { ExpandedLayer } from '$lib/expanded-models';
  import LayerToggler from './toggles/LayerToggler.svelte';
  import * as Drawer from "$lib/components/ui/drawer";
  import { Button, buttonVariants } from "$lib/components/ui/button";
	import { MediaQuery } from 'svelte/reactivity';

  export let layers: ExpandedLayer[] = [];
  export let selectedLayers: Map<string, ExpandedLayer>;
  export let visible = true;

  const isDesktop = new MediaQuery("(min-width: 768px)");
</script>

{#if isDesktop.current}
  {#if isDesktop.current}
  <div
          class={`fixed left-0 top-0 z-20 h-full w-96 overflow-y-auto border-r border-black/10 bg-gradient-to-b from-amber-50 to-orange-50 font-serif text-amber-900 transition-all duration-500 ease-in-out 
          ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'} hidden md:block hidden md:block`}
          style="font-family: 'Merriweather', serif;"
        >
          <div class="p-6">
            <h2 class="mb-1rem text-center text-2xl font-bold tracking-wider">Capas</h2>
            <div class="space-y-2">
              <LayerToggler {layers} bind:selectedLayers />
            </div>
          </div>
          
        </div>
{:else}
  <div class="fixed bottom-0 z-20"
  style="font-family: 'Merriweather', serif;"
  >
  <Drawer.Root>
    <Drawer.Trigger 
    class="border border-b-2 border-r-2 border-black/10 bg-gradient-to-b from-amber-50 to-orange-50 font-serif font-bold text-amber-900 transition-all hover:text-amber-900 hover:bg-gradient-to-b hover:from-amber-100 hover:to-orange-100 py-2 px-4 rounded-lg"
    >
    Capas
    </Drawer.Trigger>
    <Drawer.Content class="bg-orange-50">
      <Drawer.Header class="text-center text-amber-900" style="font-family: 'Merriweather', serif;">
        <Drawer.Title>Capas</Drawer.Title>
        <Drawer.Description class="text-amber-700" style="font-family: 'Merriweather', serif;">
          This is where you can select layers on mobile
        </Drawer.Description>
      </Drawer.Header>
      <Drawer.Footer>
        <Button class="bg-orange-200 text-amber-700 text-md transition-all hover:bg-amber-100 " style="font-family: 'Merriweather', serif;">Submit</Button>
        <Drawer.Close class="text-amber-700" style="font-family: 'Merriweather', serif;">Close</Drawer.Close>
      </Drawer.Footer>
    </Drawer.Content>
  </Drawer.Root>
  </div>
{/if}
{:else}
  <div></div>
{/if}
