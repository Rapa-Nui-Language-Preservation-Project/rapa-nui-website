<script lang="ts">
	import Map from '$lib/components/map/Map.svelte';

	let { data } = $props();
	let { layers } = data;
	let bases = ['Rapa Nui','Geografía'];
</script>

<Map {bases} {layers} />
