<script>
	import maplibregl from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';

	let { hidden } = $props();

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

		map.on('click', (e) => {
			console.log(e.lngLat);
		});
	});
</script>

<div id="map" class="absolute h-screen" {hidden}></div>
