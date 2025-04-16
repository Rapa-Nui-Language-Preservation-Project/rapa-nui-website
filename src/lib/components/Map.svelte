<script>
	import maplibregl from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { Protocol } from 'pmtiles';
	import { mode } from 'mode-watcher';

	let { hidden } = $props();
	let dark = $state(false);

	mode.subscribe((m) => {
		dark = m === 'dark';
	});

	$effect(() => {
		let protocol = new Protocol();
		maplibregl.addProtocol('pmtiles', protocol.tile);

		const map = new maplibregl.Map({
			container: 'map',
			style: dark ? '/map-dark.json' : '/map-light.json',
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
