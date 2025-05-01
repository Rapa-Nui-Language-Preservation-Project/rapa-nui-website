<script lang="ts">
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	let images: string[] = [];
	let current = 0;

	let visible = true;

	// background image changes every 3 seconds
	const delay = 3000;

	onMount(async () => {
		const res = await fetch('http://127.0.0.1:8090/api/collections/media/records?filter=type="image"&perPage=20');
		const data = await res.json();

		images = data.items.map((item: any) =>
			`http://127.0.0.1:8090/api/files/${item.collectionId}/${item.id}/${item.file}`
		);

		// Start cycling
		setInterval(() => {
			visible = false;
			setTimeout(() => {
				current = (current + 1) % images.length;
				visible = true;
			}, 400); // fade out before switching
		}, delay);
	});
</script>

{#if images.length}
	{#if visible}
		<img
            src={images[current]}
            class="fixed left-0 top-0 -z-10 h-screen w-screen object-cover transition-opacity duration-500"
            in:fade={{ duration: 500 }}
            out:fade={{ duration: 500 }}
            alt=""
        />
    
	{/if}
{/if}
