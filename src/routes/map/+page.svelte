<script lang="ts">
	import Map from '$lib/components/Map.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { cn } from '$lib/utils';

	let hidden = $state(false);
	let { data } = $props();
	let { layers } = data;
</script>

<Map {layers} {hidden} />
<main class={cn('flex w-screen justify-center bg-[#34373d]', hidden && 'h-screen')}>
	<Button
		onclick={() => (hidden = !hidden)}
		variant="secondary"
		class="absolute bottom-8 right-0 m-4"
	>
		{hidden ? 'Show Map' : 'Hide Map'}
	</Button>
	<div class="absolute h-screen" hidden={!hidden}>
		<img
			src="http://127.0.0.1:8090/api/files/ia77ailu3ghoodv/6jjx168s5ezt2m8/map_k7mm569qll.png"
			class="h-screen"
			alt="Map of Easter Island"
		/>
	</div>
</main>
