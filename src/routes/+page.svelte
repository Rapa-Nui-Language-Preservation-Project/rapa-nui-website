<script lang="ts">
	import Footer from '$lib/components/layout/Footer.svelte';
	import NavigationCard from '$lib/components/home/NavigationCard.svelte';

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

<main class="h-screen w-screen overflow-hidden bg-black font-serif font-thin text-white">
	<div class="mt-4 flex flex-col items-center justify-center">
		<h1 class="m-2 w-fit text-wrap text-5xl text-white min-[450px]:text-7xl">
			<span class="">Rapa Nui</span>
		</h1>
		<h2 class="m-2 mt-1 text-wrap text-xl min-[450px]:text-3xl">
			Recursos para la documentación digital
		</h2>
		<div class="m-5 mt-32 flex flex-row flex-wrap items-center justify-center gap-4">
			<NavigationCard card={cards[0]}>
				<img
					src="http://127.0.0.1:8090/api/files/ia77ailu3ghoodv/s718fkw89hh68y9/paper_camera2012_11_26_14_17_43_af9n9sbkio.jpg"
					alt="imagen"
					class="h-[200px] w-full rounded-sm object-cover outline-offset-1 transition-opacity"
				/>
			</NavigationCard>
			<NavigationCard card={cards[1]}>
				<img
					src="http://127.0.0.1:8090/api/files/ia77ailu3ghoodv/6jjx168s5ezt2m8/map_k7mm569qll.png"
					alt="An outline Map of Easter Island"
					class="h-[200px] w-full rounded-sm object-cover outline-offset-1 transition-opacity"
				/>
			</NavigationCard>
			<NavigationCard card={cards[2]}>
				<img
					src="http://127.0.0.1:8090/api/files/ia77ailu3ghoodv/hv0b009265nrg85/hmppx5_13yd9imgw5.png"
					alt=""
					class="h-[200px] w-full rounded-sm object-cover outline-offset-1 transition-opacity"
				/>
			</NavigationCard>
		</div>
	</div>
</main>
