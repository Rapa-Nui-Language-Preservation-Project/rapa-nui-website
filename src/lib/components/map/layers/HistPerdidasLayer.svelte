<script lang="ts">
	import type { ExpandedLocation } from '$lib/expanded-models';
	import Youtube from 'svelte-youtube-embed';
	let { location }: { location: ExpandedLocation } = $props();
</script>

<h1 class="text-xl font-bold">{location.name}</h1>
<p class="text-md preserve-whitespace text-center font-normal">
	{location.description_espanol}
</p>
<div class="h-full w-full">
	<Youtube id={location.description_rapa_nui} thumbnail={undefined} play_button={undefined} />
</div>

