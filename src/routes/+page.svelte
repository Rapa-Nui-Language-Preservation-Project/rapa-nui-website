<script lang="ts">
	import Footer from '$lib/components/layout/Footer.svelte';
	import NavigationCard from '$lib/components/home/NavigationCard.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import ImageMarquee from '$lib/components/home/ImageMarquee.svelte';

	let cards = [
		{
			title: 'Aprende Rapa Nui',
			description:
				'Aquí estaremos compartiendo recursos para aprender Rapa Nui, la lengua de la Isla de Pascua.',
			href: '/#'
		},
		{
			title: 'Mapa Cultural de la Isla de Pascua',
			description:
				'Pon click para navegar a través de una collección de cuentas, lugares, eventos y fotos compartido por la comunidad.',
			href: '/map'
		},
		{
			title: 'Glosario de Palabras',
			description: 'Una collección de información y cuentas donado por su historia y cultura.',
			href: '/#'
		}
	];
</script>

<ImageMarquee />

<div
	class="min-h-screen w-screen bg-cover bg-center bg-no-repeat"
	style="background-image: url('http://127.0.0.1:8090/api/files/ia77ailu3ghoodv/oi61y31b9ukmkwa/pexels_magda_ehlers_pexels_636353_olu9cogeg5.jpg');"
>
	<main class="h-screen w-screen">
		<div class="mt-2 flex flex-col items-center justify-center">
			<div class="m-2 w-fit rounded-xl bg-muted p-4">
				<h1 class="m-2 w-fit text-wrap text-5xl min-[450px]:text-7xl">
					<span class="font-bold">Rapa Nui</span>
				</h1>
				<h2 class="m-2 mt-1 text-wrap text-2xl min-[450px]:text-4xl">
					Recursos para la documentación digital
				</h2>
			</div>
			<div class="m-5 mt-32 flex flex-row flex-wrap items-center justify-center gap-4">
				<NavigationCard card={cards[0]}>
					<img
						src="http://127.0.0.1:8090/api/files/ia77ailu3ghoodv/s718fkw89hh68y9/paper_camera2012_11_26_14_17_43_af9n9sbkio.jpg"
						alt="imagen"
						class="h-[200px] w-full rounded-md object-cover outline-offset-1 transition-opacity hover:outline"
					/>
				</NavigationCard>
				<NavigationCard card={cards[1]}>
					<img
						src="http://127.0.0.1:8090/api/files/ia77ailu3ghoodv/0de8x34jot74fcr/screenshot_2025_04_14_at_8_04_d5u5yvtdpc.27PM.png"
						alt="An outline Map of Easter Island"
						class="h-[200px] w-full rounded-md object-cover outline-offset-1 transition-opacity hover:outline"
					/>
				</NavigationCard>
				<NavigationCard card={cards[2]}>
					<img
						src="http://127.0.0.1:8090/api/files/ia77ailu3ghoodv/hv0b009265nrg85/hmppx5_13yd9imgw5.png"
						alt=""
						class="h-[200px] w-full rounded-md object-cover outline-offset-1 transition-opacity hover:outline"
					/>
				</NavigationCard>
			</div>
		</div>
		<Footer />
	</main>
</div>
