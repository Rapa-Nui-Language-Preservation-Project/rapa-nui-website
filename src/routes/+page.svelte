<script lang="ts">
	import Map from '$lib/components/map/Map.svelte';
	import Tiptap from '$lib/components/page-editor/Tiptap.svelte';

	let { data } = $props();
	let { layers, pruebas } = data;
	let bases = ['Rapa Nui', 'Geografía'];
</script>

<!-- UNCOMMENT TO GET MAP BACK -->
<!-- <Map {bases} {layers} {pruebas} /> -->

<main>
	<Tiptap />
</main>
