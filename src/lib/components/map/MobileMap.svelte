<script lang="ts">
	let { artisticMapSrc }: { artisticMapSrc: string } = $props();
</script>

<div class="relative flex h-screen w-screen flex-col bg-gray-900">
	<div
		class="absolute z-20 m-4 mt-8 rounded-lg border border-amber-200 bg-gradient-to-b from-amber-50 to-orange-50 p-3 text-center"
		style="font-family: 'Merriweather', serif;"
	>
		<h3 class="mb-2 text-lg font-semibold text-amber-900">Recomendado Para Escritorio</h3>
		<p class="text-sm text-amber-700">
			Este mapa interactivo ha sido optimizado para ser explorado en computadoras de escritorio. Recomendamos usar
			una computadora de escritorio o una tableta para poder acceder a todos los controles del mapa y a la
			información del sitio.
		</p>
	</div>
	<div class="flex h-full w-full items-center justify-center px-4 pb-6 pt-32">
		<img src={artisticMapSrc} alt="Mapa artístico de Rapa Nui" class="h-auto w-full max-w-4xl object-contain" />
	</div>
</div>
