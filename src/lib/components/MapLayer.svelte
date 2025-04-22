<script lang="ts">
	import MarkerPopup from './MarkerPopup.svelte';

	let { layer } = $props();
</script>

{#each layer.expand.locations as location}
	<MarkerPopup {location} />
{/each}
