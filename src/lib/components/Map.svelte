<script lang="ts">
	import maplibregl from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { Protocol } from 'pmtiles';
	import { mode } from 'mode-watcher';

	let { hidden, interactive = false, locations } = $props();

	let dark = $state(false);
	mode.subscribe((m) => {
		dark = m === 'dark';
	});

	let protocol = new Protocol();
	maplibregl.addProtocol('pmtiles', protocol.tile);

	let map: maplibregl.Map;

	$effect(() => {
		map = new maplibregl.Map({
			container: 'map',
			style: dark ? '/map-dark.json' : '/map-light.json',
			center: [-109.35, -27.15],
			zoom: 11,
			maxZoom: 20,
			minZoom: 11,
			maxBounds: [
				[-109.65, -27.3], // Southwest coordinates
				[-109, -26.96] // Northeast coordinates
			],
			interactive
		});

		map.setStyle(dark ? '/map-dark.json' : '/map-light.json');

		for (let location of locations) {
			const { latitude, longitude, name, expand } = location;
			const { media } = expand;

			const popup = new maplibregl.Popup({
				className: 'text-black'
			}).setHTML(
				`<div class="flex flex-col items-center">
					<h3 class="text-lg font-bold">${name}</h3>
					<p class="text-sm">Latitude: ${latitude}</p>
					<p class="text-sm">Longitude: ${longitude}</p>
					<div>
						${media.map((m: any) => {
							return `<img src="${m.file}" class="w-fit object-cover" alt="${m.description}" />`;
						})}
					</div>
				</div>`
			);

			const marker = new maplibregl.Marker()
				.setLngLat([longitude, latitude])
				.addTo(map)
				.setPopup(popup);
		}

		map.on('click', (e) => {
			console.log('Map clicked at:', e.lngLat);
		});

		return () => {
			map.remove();
		};
	});
</script>

<div id="map" class="absolute left-0 top-0 h-screen" {hidden}></div>
