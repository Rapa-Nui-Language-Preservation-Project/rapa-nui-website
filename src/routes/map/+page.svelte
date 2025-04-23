<script lang="ts">
	import Map from '$lib/components/Map.svelte';

	let { data } = $props();
	let { layers } = data;

	let bases = ['Geographic', 'Artistic'];
</script>

<Map {bases} {layers} />
