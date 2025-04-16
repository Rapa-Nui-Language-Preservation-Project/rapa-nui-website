<script>
	import Map from '$lib/components/Map.svelte';

	let mapHidden = $state(false);
</script>

<Map hidden={mapHidden} />
<main class="flex h-screen w-screen justify-center bg-[#625661]">
	<button
		onclick={() => (mapHidden = !mapHidden)}
		class="absolute right-0 top-0 m-4 cursor-pointer rounded-lg bg-neutral-400 p-2 text-white hover:bg-neutral-600"
	>
		{mapHidden ? 'Show Map' : 'Hide Map'}</button
	>
	<div class="absolute h-screen">
		<img
			hidden={!mapHidden}
			src="http://127.0.0.1:8090/api/files/ia77ailu3ghoodv/6jjx168s5ezt2m8/map_k7mm569qll.png"
			class="h-screen"
			alt="Map of Easter Island"
		/>
	</div>
</main>
