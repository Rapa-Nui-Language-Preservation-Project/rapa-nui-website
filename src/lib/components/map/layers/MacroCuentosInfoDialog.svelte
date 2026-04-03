<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';

	let { open = $bindable(false) }: { open?: boolean } = $props();

	type Tab = 'descripcion' | 'autores' | 'traduccion' | 'ortografia';
	let activeTab = $state<Tab>('descripcion');
	let showSpanish = $state(false);

	const tabs: { id: Tab; labelRN: string; labelEs: string }[] = [
		{ id: 'descripcion', labelRN: "He Tallere o te Nuʼu Papaʼi Rapa Nui", labelEs: 'Taller de Escritores Rapa Nui' },
		{ id: 'autores', labelRN: "Tag̈ata Nuʼu Papaʼi", labelEs: 'Autores' },
		{ id: 'traduccion', labelRN: "He Haʼa Auraʼa ki te Vanag̈a Tire", labelEs: 'Traducción al Español' },
		{ id: 'ortografia', labelRN: "He Papaʼi Hāga ʼe he Kī Hāga", labelEs: 'Ortografía y Pronunciación' }
	];
	const currentTab = $derived(tabs.find(t => t.id === activeTab));
</script>

<Dialog.Root bind:open>
	<Dialog.Content
		class="flex max-h-[90vh] max-w-screen m-0 h-[90vh] w-[90vw] flex-col gap-0 bg-gradient-to-b from-amber-50 to-orange-50 p-0 text-amber-900"
		style="font-family: 'Merriweather', serif;"
	>
		<!-- Header -->
		<div class="flex flex-col items-center gap-3 px-8 pt-8 pb-4">
			<Dialog.Title class="text-center text-2xl font-bold tracking-wide md:text-3xl">
				{showSpanish ? 'Relatos de la Isla de Pascua' : 'Aʼamu o Rapa Nui'}
			</Dialog.Title>

			<!-- Language toggle -->
			<button
				onclick={() => (showSpanish = !showSpanish)}
				class="mt-4 rounded-full bg-primary px-4 py-2 text-white shadow hover:bg-primary/80"
			>
				{showSpanish ? 'Ver en Rapa Nui' : 'Ver en Español'}
			</button>

			<!-- Tabs -->
			<div class="flex w-full flex-wrap justify-center gap-x-1 gap-y-1 border-b border-amber-300 pb-0">
				{#each tabs as tab}
					<button
						onclick={() => (activeTab = tab.id)}
						class={`whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors ${
							activeTab === tab.id
								? 'border-b-2 border-orange-600 text-orange-700'
								: 'text-amber-800 hover:text-orange-600'
						}`}
					>
						{showSpanish ? tab.labelEs : tab.labelRN}
					</button>
				{/each}
			</div>
		</div>

		<!-- Tab content -->
		<ScrollArea class="flex-1 px-8 pb-8">
			<div class="max-w-prose mx-auto py-4 text-base leading-relaxed">
				<h2 class="mb-4 text-xl font-bold text-amber-900">
					{showSpanish ? currentTab?.labelEs : currentTab?.labelRN}
				</h2>
				{#if activeTab === 'descripcion'}
					{#if showSpanish}
						<p class="mb-4">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Este es texto de relleno para
							la descripción del proyecto de Macrocuentos de Rapa Nui. El proyecto tiene como objetivo
							preservar y difundir las tradiciones narrativas de la isla.
						</p>
						<p>
							Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
							veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
						</p>
					{:else}
						<p class="mb-4">
							Lorem ipsum kōrero i te kaiga o Rapa Nui. He teksto haka ū i te kōrero o te Macrocuentos
							o Rapa Nui. Ko te hāpuku o tēnei kaiga ko te tiaki e te ākina i te mau kōrero tārito.
						</p>
						<p>
							He aha te mea nui o te ao? He tangata, he tangata, he tangata. Lorem ipsum haka ū i te
							reo me te tikanga o te hōnui.
						</p>
					{/if}
				{:else if activeTab === 'autores'}
					{#if showSpanish}
						<p class="mb-3">
							Lorem ipsum nombre del autor uno. Descripción breve del autor y su contribución al
							proyecto.
						</p>
						<p class="mb-3">
							Lorem ipsum nombre del autor dos. Descripción breve del autor y su contribución al
							proyecto.
						</p>
						<p>
							Lorem ipsum nombre del autor tres. Descripción breve del autor y su contribución al
							proyecto.
						</p>
					{:else}
						<p class="mb-3">
							Lorem ipsum ingoa o te tangata kotahi. Kōrero poto i te tangata me tōna āvanga ki te
							kaiga.
						</p>
						<p class="mb-3">
							Lorem ipsum ingoa o te tangata rua. Kōrero poto i te tangata me tōna āvanga ki te kaiga.
						</p>
						<p>
							Lorem ipsum ingoa o te tangata toru. Kōrero poto i te tangata me tōna āvanga ki te
							kaiga.
						</p>
					{/if}
				{:else if activeTab === 'traduccion'}
					{#if showSpanish}
						<p class="mb-4">
							Lorem ipsum descripción del proceso de traducción. Este texto explica cómo se llevó a
							cabo la traducción de los textos del rapa nui al español y viceversa.
						</p>
						<p>
							Se buscó mantener el espíritu y la cadencia del rapa nui original, respetando las
							estructuras lingüísticas propias de la lengua polinesia.
						</p>
					{:else}
						<p class="mb-4">
							Lorem ipsum kōrero i te haka reo. Ko tēnei teksto he whakamārama i te āhua o te haka
							reo mai i te reo Rapa Nui ki te reo Hīpānia.
						</p>
						<p>
							I rapakau e tiaki i te āhua me te ārea o te reo Rapa Nui taketake, e tūhono ana ki te
							ārea o te reo Poronesia.
						</p>
					{/if}
				{:else if activeTab === 'ortografia'}
					{#if showSpanish}
						<p class="mb-4">
							Lorem ipsum guía de ortografía y pronunciación. Este texto explica las convenciones
							ortográficas utilizadas en el libro y cómo pronunciar correctamente las palabras en rapa
							nui.
						</p>
						<p class="mb-4">
							Las vocales se pronuncian como en español. Las consonantes tienen algunas particularidades
							propias del rapa nui que se detallan a continuación.
						</p>
						<p>Lorem ipsum información adicional sobre glotales y vocales largas.</p>
					{:else}
						<p class="mb-4">
							Lorem ipsum ārea o te tuhuga reo. Ko tēnei teksto he whakamārama i ngā tikanga tuhuga e
							whakamahia ana i roto i te pukapuka.
						</p>
						<p class="mb-4">
							Ko ngā oropuare he rite ki te reo Hīpānia. Ko ngā orokati he āhua motuhake o te reo Rapa
							Nui.
						</p>
						<p>Lorem ipsum kōrero āpiti mō ngā orokati me ngā oropuare roa.</p>
					{/if}
				{/if}
			</div>

		</ScrollArea>

		<!-- Static publication info -->
		<div class="border-t border-amber-300 px-6 py-2 text-center text-[11px] text-amber-700">
			<p class="flex flex-wrap justify-center gap-x-3 gap-y-0.5">
				<span>© INTENDENCIA DE LA V REGION</span>
				<span>© EDITORIAL ANDRES BELLO</span>
				<span>Av. Ricardo Lyon 946, Santiago de Chile</span>
				<span>Inscripción N° 61.021</span>
				<span>Se terminó de imprimir esta primera edición de 2.000 ejemplares en el mes de Marzo de 1986</span>
				<span>IMPRESORES: Imprenta Mueller S.A.</span>
				<span>IMPRESO EN CHILE / PRINTED IN CHILE</span>
			</p>
		</div>
	</Dialog.Content>
</Dialog.Root>
