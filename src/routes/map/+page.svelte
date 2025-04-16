<script>
	import Map from '$lib/components/Map.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	let hidden = $state(false);
</script>

<Map {hidden} />
<main class="flex h-screen w-screen justify-center bg-[#34373d]">
	<Button
		onclick={() => (hidden = !hidden)}
		variant="secondary"
		class="absolute bottom-8 right-0 m-4"
	>
		{hidden ? 'Show Map' : 'Hide Map'}
	</Button>
	<div class="absolute h-screen">
		<img
			hidden={!hidden}
			src="http://127.0.0.1:8090/api/files/ia77ailu3ghoodv/6jjx168s5ezt2m8/map_k7mm569qll.png"
			class="h-screen"
			alt="Map of Easter Island"
		/>
	</div>
</main>
