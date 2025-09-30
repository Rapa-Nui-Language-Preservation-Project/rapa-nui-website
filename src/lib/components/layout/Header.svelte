<script lang="ts">
	import { page } from '$app/state';

	let currentPath = $state(page.url.pathname);

	$effect(() => {
		currentPath = page.url.pathname;
	});

	const pages = [
		{ name: 'Home', path: '/' },
		{ name: 'Map', path: '/map' }
	];
</script>

