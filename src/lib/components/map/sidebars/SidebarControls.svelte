<script lang="ts">
  import { ChevronLeft, ChevronRight, EyeOff } from 'lucide-svelte';

  export let leftVisible = true;
  export let rightVisible = true;

  const showBoth = () => {
    leftVisible = true;
    rightVisible = true;
  };

  const hideBoth = () => {
    leftVisible = false;
    rightVisible = false;
  };

  $: bothHidden = !leftVisible && !rightVisible;
</script>

{#if bothHidden}
  <!-- Click areas to show sidebars when hidden -->
  <div
    role="button"
    tabindex="0"
    onclick={showBoth}
    onkeydown={(e) => e.key === 'Enter' && showBoth()}
    class="group fixed left-0 top-0 z-10 h-full w-1/4 cursor-pointer bg-transparent md:w-1/6"
  >
    <ChevronRight
      class="fixed left-4 top-1/2 -translate-y-1/2 transform text-white/50 transition-all duration-300 group-hover:scale-125 group-hover:text-white"
      size={32}
    />
  </div>

  <div
    role="button"
    tabindex="0"
    onclick={showBoth}
    onkeydown={(e) => e.key === 'Enter' && showBoth()}
    class="group fixed right-0 top-0 z-10 h-full w-1/4 cursor-pointer bg-transparent md:w-1/6"
  >
    <ChevronLeft
      class="fixed right-4 top-1/2 -translate-y-1/2 transform text-white/50 transition-all duration-300 group-hover:scale-125 group-hover:text-white"
      size={32}
    />
  </div>
{/if}

{#if leftVisible || rightVisible}
  <!-- Hide Sidebars Button -->
  <button
    onclick={hideBoth}
    class="fixed bottom-4 left-1/2 z-30 -translate-x-1/2 transform rounded-full bg-orange-600 p-3 text-white shadow-xl transition-colors hover:bg-orange-700 hidden md:block"
    aria-label="Hide Sidebars"
  >
    <EyeOff size={24} />
  </button>
{/if}

