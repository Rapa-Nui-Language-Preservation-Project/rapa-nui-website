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
	<Card.Root class="h-fit w-[380px] transition-transform hover:scale-105 max-[450px]:w-full">
		<Card.Header>
			<Card.Title class="font-normal text-faded">{title}</Card.Title>
			<Card.Description>{description}</Card.Description>
		</Card.Header>
		<Card.Content>
			{@render children?.()}
		</Card.Content>
	</Card.Root>
</a>
