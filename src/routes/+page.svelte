<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import { fade, scale } from 'svelte/transition';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
</script>

<main class="h-screen w-screen">
	<Header />
	<div class="mt-52 flex flex-col items-center justify-center">
		<div class="m-2 w-fit rounded-xl bg-muted p-4">
			<h1 class="m-2 w-fit text-wrap text-5xl min-[450px]:text-7xl">
				<span class="font-bold">Rapa Nui</span> Preservation
			</h1>
			<h2 class="m-2 mt-1 text-wrap text-2xl min-[450px]:text-4xl">a digital archive</h2>
		</div>
		<div class="m-5 mt-32 flex flex-row flex-wrap items-center justify-center gap-4">
			<a href="/map">
				<Card.Root class="w-[380px] transition-transform hover:scale-105 max-[450px]:w-full">
					<Card.Header>
						<Card.Title class="text-faded font-normal">View our Map</Card.Title>
						<Card.Description
							>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde incidunt perspiciatis
							laudantium vero deserunt. Lorem ipsum dolor sit amet consectetur.</Card.Description
						>
					</Card.Header>
					<Card.Content>
						<img
							src="http://127.0.0.1:8090/api/files/ia77ailu3ghoodv/0de8x34jot74fcr/screenshot_2025_04_14_at_8_04_d5u5yvtdpc.27PM.png"
							alt="An outline Map of Easter Island"
							class="h-[200px] w-full rounded-md object-cover outline-offset-1 transition-opacity hover:outline"
						/>
					</Card.Content>
				</Card.Root>
			</a>
			<Card.Root class="w-[380px] max-[450px]:w-full">
				<Card.Header>
					<Card.Title class="text-faded font-normal">Sequi quis enim architecto amet</Card.Title>
					<Card.Description
						>Vitae est quasi eaque in, iste, blanditiis animi debitis tempore ad ea rerum quisquam
						suscipit ut voluptatem.
					</Card.Description>
				</Card.Header>
				<Card.Content>
					<Button variant="secondary" class="h-[200px] w-full rounded-md bg-muted"></Button>
				</Card.Content>
			</Card.Root>
			<Card.Root class="w-[380px] max-[450px]:w-full">
				<Card.Header>
					<Card.Title class="text-faded font-normal">Quibusdam sint possimus nobis</Card.Title>
					<Card.Description
						>Iste pariatur, exercitationem possimus sapiente dolores in asperiores ut perspiciatis
						labore, tenetur odio! Sapiente itaque consectetur vel.</Card.Description
					>
				</Card.Header>
				<Card.Content>
					<Button variant="secondary" class="h-[200px] w-full rounded-md bg-muted"></Button>
				</Card.Content>
			</Card.Root>
		</div>
	</div>
	<Footer />
</main>
