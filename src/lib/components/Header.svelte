<script lang="ts">
	import ModeSwitcher from './ModeSwitcher.svelte';
	import { Button } from './ui/button';
</script>

<header class="absolute top-0 z-50 flex w-screen items-center p-5">
	<div class="inline-flex items-center justify-start" style="width: 50%;">
		<div
			class="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-center text-faded"
		>
			LOGO
		</div>
	</div>
	<div class="inline-flex shrink-0 items-center rounded-lg bg-secondary">
		<a href="/">
			<Button variant="link">Home</Button>
		</a>
		<a href="/map">
			<Button variant="link">Map</Button>
		</a>
	</div>
	<div class="inline-flex justify-end" style="width: 50%;">
		<ModeSwitcher />
	</div>
</header>
