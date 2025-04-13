<script>
	import maplibregl from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	let { modal } = $props();

	$effect(() => {
		const map = new maplibregl.Map({
			container: 'map',
			style: 'https://demotiles.maplibre.org/style.json',
			center: [-109.35, -27.15],
			zoom: 11,
			maxZoom: 20,
			minZoom: 11,
			maxBounds: [
				[-109.65, -27.3], // Southwest coordinates
				[-109, -26.96] // Northeast coordinates
			]
		});

		const marker = new maplibregl.Marker()
			.setLngLat([-109.35961303710897, -27.116696224608503])
			.addTo(map);

		map.on('click', (e) => {
			const coordinates = e.lngLat;
			console.log('Clicked coordinates: ', coordinates);
			marker.setLngLat(coordinates);
		});
	});

	let map_hidden = $state(false);
</script>

<div id="map" class="absolute h-screen" hidden={map_hidden}></div>
<main class="flex h-screen w-screen justify-center bg-[#625661]">
	<button
		onclick={modal}
		class="bouncy blurry absolute top-0 left-0 m-4 cursor-pointer rounded-lg bg-neutral-400"
	>
		return
	</button>
	<button
		onclick={() => (map_hidden = !map_hidden)}
		class="bouncy blurry absolute top-0 right-0 m-4 cursor-pointer rounded-lg bg-neutral-400"
	>
		{map_hidden ? 'Show Map' : 'Hide Map'}</button
	>
	<div class="absolute h-screen">
		<img
			hidden={!map_hidden}
			src="http://127.0.0.1:8090/api/files/ia77ailu3ghoodv/6jjx168s5ezt2m8/map_k7mm569qll.png"
			class="h-screen"
			alt="Map of Easter Island"
		/>
	</div>
</main>
