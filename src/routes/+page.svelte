<script lang="ts">
	import Footer from '$lib/components/layout/Footer.svelte';
	import NavigationCard from '$lib/components/home/NavigationCard.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	let cards = [
		{
			title: 'Lorem Ipsum Dolor',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Blanditiis optio deserunt qui officia dolores vel voluptas nesciunt ipsam voluptatibus.',
			href: '/#'
		},
		{
			title: 'View our Map',
			description:
				'Blanditiis optio deserunt qui officia dolores vel voluptas nesciunt ipsam voluptatibus beatae inventore, nihil quis. Ab, autem earum voluptatibus ipsam quas libero?',
			href: '/map'
		},
		{
			title: 'Lorem Ipsum Dolor',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Blanditiis optio deserunt qui officia dolores vel voluptas nesciunt ipsam voluptatibus.',
			href: '/#'
		}
	];
</script>

<main class="h-screen w-screen">
	<div class="mt-52 flex flex-col items-center justify-center">
		<div class="m-2 w-fit rounded-xl bg-muted p-4 ">
			<h1 class="m-2 w-fit text-wrap text-5xl min-[450px]:text-7xl">
				<span class="font-bold">Rapa Nui</span> Preservation
			</h1>
			<h2 class="m-2 mt-1 text-wrap text-2xl min-[450px]:text-4xl">a digital archive</h2>
		</div>
		<div class="m-5 mt-32 flex flex-row flex-wrap items-center justify-center gap-4">
			<NavigationCard card={cards[0]}>
				<Button variant="secondary" class="h-[200px] w-full rounded-md bg-muted" />
			</NavigationCard>
			<NavigationCard card={cards[1]}>
				<img
					src="http://127.0.0.1:8090/api/files/ia77ailu3ghoodv/0de8x34jot74fcr/screenshot_2025_04_14_at_8_04_d5u5yvtdpc.27PM.png"
					alt="An outline Map of Easter Island"
					class="h-[200px] w-full rounded-md object-cover outline-offset-1 transition-opacity hover:outline"
				/>
			</NavigationCard>
			<NavigationCard card={cards[2]}>
				<Button variant="secondary" class="h-[200px] w-full rounded-md bg-muted" />
			</NavigationCard>
		</div>
	</div>
	<Footer />
</main>
