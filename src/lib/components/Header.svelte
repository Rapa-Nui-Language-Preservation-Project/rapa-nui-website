<script lang="ts">
	import { page } from '$app/state';
	import ModeSwitcher from './ModeSwitcher.svelte';
	import { Button } from './ui/button';

	let currentPath = $state(page.url.pathname);

	$effect(() => {
		currentPath = page.url.pathname;
	});

	const pages = [
		{ name: 'Home', path: '/' },
		{ name: 'Map', path: '/map' }
	];
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
		{#each pages as page}
			<a href={page.path} class="rounded-lg text-sm font-medium text-muted hover:bg-secondary">
				<Button variant="link" class={page.path == currentPath ? 'underline' : ''}>
					{page.name}
				</Button>
			</a>
		{/each}
	</div>
	<div class="inline-flex justify-end" style="width: 50%;">
		<ModeSwitcher />
	</div>
</header>
