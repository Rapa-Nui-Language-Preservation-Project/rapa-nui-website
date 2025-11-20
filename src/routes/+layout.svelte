<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import Header from '$lib/components/layout/Header.svelte';

	import '../app.css';
	let { children } = $props();
</script>

<!-- <ModeWatcher /> -->
<Header />
{@render children()}
