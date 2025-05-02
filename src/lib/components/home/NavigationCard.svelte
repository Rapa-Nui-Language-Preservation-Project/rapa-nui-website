<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { Snippet } from 'svelte';

	let {
		card,
		children
	}: { card: { title: string; description: string; href: string }; children?: Snippet } = $props();
	let { title, description, href } = card;
</script>

<a {href}>
	<Card.Root
		class="h-fit w-[380px] border-0 bg-black text-white transition-transform duration-75 hover:scale-105 max-[450px]:w-full"
	>
		<Card.Header class="">
			<Card.Title class="">{title}</Card.Title>
			<Card.Description>{description}</Card.Description>
		</Card.Header>
		<Card.Content class="border-none outline-none">
			{@render children?.()}
		</Card.Content>
	</Card.Root>
</a>
