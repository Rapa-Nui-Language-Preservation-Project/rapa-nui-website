<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';

	let { open = $bindable(false) }: { open?: boolean } = $props();

	type Tab = 'descripcion' | 'autores' | 'traduccion' | 'ortografia';
	let activeTab = $state<Tab>('descripcion');
	let showSpanish = $state(false);

	const tabs: { id: Tab; labelRN: string; labelEs: string }[] = [
		{
			id: 'descripcion',
			labelRN: 'He Tallere o te Nuʼu Papaʼi Rapa Nui',
			labelEs: 'Taller de Escritores Rapa Nui'
		},
		{ id: 'autores', labelRN: 'Tag̈ata Nuʼu Papaʼi', labelEs: 'Autores' },
		{
			id: 'traduccion',
			labelRN: 'He Haʼa Auraʼa ki te Vanag̈a Tire',
			labelEs: 'Traducción al Español'
		},
		{
			id: 'ortografia',
			labelRN: 'He Papaʼi Hāga ʼe he Kī Hāga',
			labelEs: 'Ortografía y Pronunciación'
		}
	];
	const currentTab = $derived(tabs.find((t) => t.id === activeTab));
</script>

<Dialog.Root bind:open>
	<Dialog.Content
		class="max-w-screen m-0 flex h-[90vh] max-h-[90vh] w-[90vw] flex-col gap-0 bg-gradient-to-b from-amber-50 to-orange-50 p-0 text-amber-900"
		style="font-family: 'Merriweather', serif;"
	>
		<!-- Header -->
		<div class="flex flex-col items-center gap-3 px-8 pb-4 pt-8">
			<Dialog.Title class="text-center text-2xl font-bold tracking-wide md:text-3xl">
				{showSpanish ? 'Relatos de la Isla de Pascua' : 'ʼAʼAMU O RAPA NUI'}
			</Dialog.Title>

			<!-- Language toggle -->
			<button
				onclick={() => (showSpanish = !showSpanish)}
				class="mt-4 rounded-full bg-primary px-4 py-2 text-white shadow hover:bg-primary/80"
			>
				{showSpanish ? 'Ver en Rapa Nui' : 'Ver en Español'}
			</button>

			<!-- Tabs -->
			<div
				class="flex w-full flex-wrap justify-center gap-x-1 gap-y-1 border-b border-amber-300 pb-0"
			>
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
			<div class="mx-auto max-w-prose py-4 text-base leading-relaxed">
				<h2 class="mb-4 text-xl font-bold text-amber-900">
					{showSpanish ? currentTab?.labelEs : currentTab?.labelRN}
				</h2>
				{#if activeTab === 'descripcion'}
					{#if showSpanish}
						<p class="mb-4">
							Estas obras fueron redactadas y editadas originariamente durante el primer Taller de
							Escritores Rapa Nui, realizado en la Isla de Pascua en 1984 por la Universidad
							Católica de Valpa- raíso y el Instituto Lingüístico de Verano. Dicho taller tuvo como
							finalidad adiestrar a un grupo de isleños, adultos bilin- gues, de manera que lograran
							expresarse creativamente en forma escrita en su propia lengua, y así promover la
							existencia de una literatura en Rapa Nui actual al alcance de toda la comunidad
							isleña. <br />
							<br />
							<em>
								La Intendencia de la V Región. <br />
								La Gobernación de la Isla de Pascua.<br />
								La Fundación Casa Nacional de la Cultura.<br />
								La Alcaldía de la Isla de Pascua.<br />La Secretaría Regional de Educación.<br />
								La Universidad Católica de Valparaíso.<br />El Instituto Lingüístico de Verano.
							</em>
						</p>
					{:else}
						<p class="mb-4">
							I ăga ai ʼe i papaʼi ai te g̈a meʼe taʼatoʼa papaʼi nei ʼi rug̈a i te puka nei mai rug̈a
							o te g̈a puka papaʼi era ʼi te tallere raʼe hāpī era mo pa aʼi rapa nui o te matahiti
							hoʼe taʼutini iva hanere vaʼu ʼahuru ma maha, e te Universidad Católica de Valparaiso
							ʼe e te Instituto Lingüístico de Verano. Te tumu i haʼa mata ai mo haka mataʼu i te
							nuʼu raʼe paʼari o te henua, vanag̈a ʼarero rapa nui ʼe tire, ka oti era te tallere ko
							ăg̈i-ăg̈i ʼā ia te haka nehe-nehe ig̈a o te vanag̈a ana papaʼi i te rāua ʼarero. Pe ira ia
							ko ai ʼā mo ăga mo haka rahi i te puka papaʼi a rote ʼarero rapa nui haka tano ki te
							hora nei ʼe mo taiʼo e te taʼatoʼa o nei. Te tallere nei mauru-uru ki te g̈a
							instituciones nei i haka hag̈u mai ai: <br />
							<em>
								Intendencia de la V Región. <br />
								Gobernación de la Isla de Pascua. <br />
								Fundación Casa Nacional de la Cultura.<br />
								Alcaldía de la Isla de Pascua. <br />Secretaría Regional de Educación. <br />
								Universidad Católica de Valparaíso. <br />Instituto Lingüístico de Verano.
							</em>
						</p>
					{/if}
				{:else if activeTab === 'autores'}
					<div class="flex flex-col gap-y-1 text-lg">
						<span>1. María Paté Tuki</span>
						<span>2. Toribio Pakomio Ika</span>
						<span>3. Felipe W. Tuki Tepano</span>
						<span>4. Eusebio Tuki Tepano</span>
						<span>5. Leticia Hucke Atán</span>
						<span>6. Felipe Pakarati Tuki</span>
						<span>7. Flora Tepano Haoa</span>
						<span>8. Ana Chavez Ika</span>
						<span>9. Clementina Tepano Haoa</span>
						<span>10. Blanca Hucke Atán</span>
						<span>11. Vicki Haoa Cardinali</span>
					</div>
				{:else if activeTab === 'traduccion'}
					{#if showSpanish}
						<p class="mb-4">
							El propósito de las traducciones es ayudar a los lectores hispanohablantes a abrir una
							pequeña ventana a través de la cual miren y entiendan la cultura rapa nui.
						</p>
						<p class="mb-4">
							El idioma rapa nui es una lengua muy colorida, rica en figuras de expresión, modismos,
							dichos y proverbios. Su estructura gramatical y semántica difiere mucho de las lenguas
							indoeuropeas. Si bien es cierto que al traducir se ha tratado de seguir el original
							rapa nui lo más fielmente posible en cuanto al sentido y estructuración de párrafos,
							nos damos cuenta de que la traducción está lejos de reflejar todo el rico sabor del
							original. Queremos que se la considere más bien como una traducción semiliteral.
						</p>
						<p>
							Si se ha logrado reflejar algo de la emoción que los escritores tuvieron al releer sus
							propios textos, quedaremos muy satisfechos.
						</p>
					{:else}
						<p class="mb-4">
							Te hag̈a nei i haʼa auraʼa nei ki te vanag̈a tire, mo haka ăg̈i-ăg̈i ki te nuʼu taiʼo
							vanag̈a tire i te meʼe henua pe hē i haka tere i oho mai nei ki te hora nei.
						</p>
						<p class="mb-4">
							Te vanag̈a rapa nui he ʼarero reka e tahi ʼi te huru o te ʼanoʼi-noʼi ig̈a ʼe ki te
							nehe-nehe mau ʼana o te haʼa auraʼa ig̈a o te kā meʼe. E ko tano te ʼarero rapa nui ki
							te huru o te ʼarero indoeuropeo. Te parautiʼa mau, i haʼa auraʼa era ki te vanag̈a
							tire, mai te rapa nui era ko oti ʼā te papaʼi, te meʼe i hapaʼo rahi he auraʼa, ʼe he
							huru o te papa ig̈a ana paʼi. Ka ai atu pe ira, e ko tano pe he reka mau era o te
							vanag̈a rapa nui ka haʼa auraʼa era ki te vanag̈a tire. ʼO ira te haka auraʼa nei ki te
							vanag̈a tire e haka tuʼu nō pe he meʼe ena ku ʼapa hahine no ʼā.
						</p>
						<p>
							Pe hiva ʼana hoʼi, mo te nuʼu ka taiʼo era i te vanag̈a tire i haʼa auraʼa mai era mai
							te rapa nui, ana g̈aroʼa te reka pe rāua ʼā i papaʼi era i te puka, ko te koa ʼō ia i a
							mātou.
						</p>
					{/if}
				{:else if activeTab === 'ortografia'}
					{#if showSpanish}
						<p class="mb-4">
							El alfabeto experimental, elegido por los participantes mismos del Taller de
							Escritores Rapa Nui, y empleado de modo uniforme en sus proyectos, consta de las
							siguientes letras:
						</p>
						<div class="my-4 overflow-x-auto rounded bg-amber-100/60 px-4 py-3">
							<table class="mx-auto font-mono text-sm">
								<tbody>
									<tr>
										<td class="px-1.5 text-center">a</td><td class="px-1.5 text-center">ā</td><td
											class="px-1.5 text-center">e</td
										><td class="px-1.5 text-center">ē</td><td class="px-1.5 text-center">h</td><td
											class="px-1.5 text-center">i</td
										><td class="px-1.5 text-center">ī</td><td class="px-1.5 text-center">k</td><td
											class="px-1.5 text-center">ʼ</td
										><td class="px-1.5 text-center">m</td><td class="px-1.5 text-center">n</td><td
											class="px-1.5 text-center">g̈</td
										><td class="px-1.5 text-center">o</td><td class="px-1.5 text-center">ō</td><td
											class="px-1.5 text-center">p</td
										><td class="px-1.5 text-center">r</td><td class="px-1.5 text-center">t</td><td
											class="px-1.5 text-center">u</td
										><td class="px-1.5 text-center">ū</td><td class="px-1.5 text-center">v</td>
									</tr>
									<tr>
										<td class="px-1.5 text-center">A</td><td class="px-1.5 text-center">Ā</td><td
											class="px-1.5 text-center">E</td
										><td class="px-1.5 text-center">Ē</td><td class="px-1.5 text-center">H</td><td
											class="px-1.5 text-center">I</td
										><td class="px-1.5 text-center">Ī</td><td class="px-1.5 text-center">K</td><td
											class="px-1.5 text-center text-amber-400">—</td
										><td class="px-1.5 text-center">M</td><td class="px-1.5 text-center">N</td><td
											class="px-1.5 text-center">G̈</td
										><td class="px-1.5 text-center">O</td><td class="px-1.5 text-center">Ō</td><td
											class="px-1.5 text-center">P</td
										><td class="px-1.5 text-center">R</td><td class="px-1.5 text-center">T</td><td
											class="px-1.5 text-center">U</td
										><td class="px-1.5 text-center">Ū</td><td class="px-1.5 text-center">V</td>
									</tr>
								</tbody>
							</table>
						</div>
						<p class="mb-4">
							Todas las vocales se pronuncian como en el español; pero en rapa nui, como en las
							demás lenguas polinésicas, existe contraste entre las vocales breves y las alargadas.
							Las vocales alargadas llevan sobrepuesto un guión.
						</p>
						<p class="mb-4">
							Las consonantes k, m, n, p, t también se pronuncian como en español. En cuanto a las
							demás consonantes, conviene considerar lo siguiente:
						</p>
						<div class="mb-4 space-y-4">
							<div>
								<p>
									<span class="font-mono font-semibold">h–</span> La consonante h se pronuncia como una
									aspiración fuerte, algo así como la j española, pero sin aspereza. Su pronunciación
									es más cercana a la h alemana o inglesa, ej.:
								</p>
								<p class="ml-6 mt-1 font-mono text-sm">haha = "boca".</p>
							</div>
							<div>
								<p>
									<span class="font-mono font-semibold">ʼ–</span> La ʼ (llamada ʼeʼe) es una consonante
									sorda que se produce cerrando momentáneamente la glotis:
								</p>
								<div class="ml-6 mt-1 space-y-0.5 font-mono text-sm">
									<p>he ara = "camino"</p>
									<p>he ʼara = "despertarse, levantarse"</p>
									<p>he hau = "lienza; hilo"</p>
									<p>he haʼu = "sombrero"</p>
								</div>
							</div>
							<div>
								<p>
									<span class="font-mono font-semibold">g̈–</span> La consonante g̈ (llamada eg̈e) es una
									nasal velar. Se pronuncia como la n española que ocurre delante de las consonantes
									velares, como en banco, rango, banquete, ej.:
								</p>
								<p class="ml-6 mt-1 font-mono text-sm">g̈ag̈ata = "gente; hombres".</p>
							</div>
							<div>
								<p>
									<span class="font-mono font-semibold">r–</span> La consonante r es una vibrante simple,
									es decir, se pronuncia como la r intervocálica del español: caro, loro. Nunca se pronuncia
									como la r española en posición inicial de palabras: rato, risa.
								</p>
							</div>
							<div>
								<p>
									<span class="font-mono font-semibold">v–</span> La consonante v no se pronuncia como
									la v o la b españolas. La v del rapa nui se articula con los dientes superiores tocando
									el labio inferior en algún punto entre el borde y el fondo del labio.
								</p>
							</div>
						</div>
						<p class="mb-3">
							El guión (-) se usa para separar las partes de palabras derivadas por "reduplicación".
							En rapa nui, la reduplicación o repetición de una parte de una palabra, o de una
							palabra entera, da origen a una nueva palabra. Ejemplos:
						</p>
						<div class="mb-4 ml-6 space-y-0.5 font-mono text-sm">
							<p>topa = "bajar"</p>
							<p>to-topa = "bajar (varias personas)"</p>
							<p>topa-topa = "bajar (varias veces)"</p>
							<p>ahi = "fuego; lumbre"</p>
							<p>ahi-ahi = "tarde; atardecer"</p>
							<p>haʼere = "caminata; andar"</p>
							<p>haʼere-ʼere = "deambular, pasear"</p>
						</div>
						<p class="mb-4">
							A diferencia del español, el rapa nui no tiene diptongos; tampoco exige el empleo del
							acento ortográfico. Todas las palabras polisilábicas se enuncian con acento prosódico
							en la sílaba determinada por las siguientes reglas:
						</p>
						<div class="mb-4 space-y-3">
							<div class="flex gap-3">
								<span class="shrink-0 font-semibold">1)</span>
								<p>
									Si la palabra termina en vocal alargada, es aguda. Se enuncia con mayor intensidad
									en la última sílaba.
								</p>
							</div>
							<div class="flex gap-3">
								<span class="shrink-0 font-semibold">2)</span>
								<p>
									Si la palabra no termina en vocal alargada, es grave. Se enuncia con mayor
									intensidad en la penúltima sílaba.
								</p>
							</div>
						</div>
						<p>
							Todas las palabras monosilábicas con vocal alargada se enuncian con intensidad. Por
							otra parte, las palabras monosilábicas que no contienen vocal alargada son átonas o
							débiles.
						</p>
					{:else}
						<p class="mb-4">
							Te tiʼaraʼaʼi vae mo haka atu e te nuʼu hāpī ʼi roto i te Tallere Raʼe o te Nuʼu
							Papaʼi Rapa Nui, ʼe i haka tano ai mo ti-tika tahi o te rāua ăga, ko te g̈a tiʼaraʼa
							nei:
						</p>
						<div class="my-4 overflow-x-auto rounded bg-amber-100/60 px-4 py-3">
							<table class="mx-auto font-mono text-sm">
								<tbody>
									<tr>
										<td class="px-1.5 text-center">a</td><td class="px-1.5 text-center">ā</td><td
											class="px-1.5 text-center">e</td
										><td class="px-1.5 text-center">ē</td><td class="px-1.5 text-center">h</td><td
											class="px-1.5 text-center">i</td
										><td class="px-1.5 text-center">Ī</td><td class="px-1.5 text-center">k</td><td
											class="px-1.5 text-center">ʼ</td
										><td class="px-1.5 text-center">m</td><td class="px-1.5 text-center">n</td><td
											class="px-1.5 text-center">g̈</td
										><td class="px-1.5 text-center">o</td><td class="px-1.5 text-center">ō</td><td
											class="px-1.5 text-center">p</td
										><td class="px-1.5 text-center">r</td><td class="px-1.5 text-center">t</td><td
											class="px-1.5 text-center">u</td
										><td class="px-1.5 text-center">ū</td><td class="px-1.5 text-center">v</td>
									</tr>
									<tr>
										<td class="px-1.5 text-center">A</td><td class="px-1.5 text-center">Ā</td><td
											class="px-1.5 text-center">E</td
										><td class="px-1.5 text-center">Ē</td><td class="px-1.5 text-center">H</td><td
											class="px-1.5 text-center">I</td
										><td class="px-1.5 text-center">Ī</td><td class="px-1.5 text-center">K</td><td
											class="px-1.5 text-center text-amber-400">—</td
										><td class="px-1.5 text-center">M</td><td class="px-1.5 text-center">N</td><td
											class="px-1.5 text-center">G̈</td
										><td class="px-1.5 text-center">O</td><td class="px-1.5 text-center">Ō</td><td
											class="px-1.5 text-center">P</td
										><td class="px-1.5 text-center">R</td><td class="px-1.5 text-center">T</td><td
											class="px-1.5 text-center">U</td
										><td class="px-1.5 text-center">Ū</td><td class="px-1.5 text-center">V</td>
									</tr>
								</tbody>
							</table>
						</div>
						<p class="mb-4">
							Pe he vanag̈a tire ʼā ana kī tahi te vocale. Pe he taʼatoʼa ʼarero maʼohi ʼana te rapa
							nui, e ai ro ʼana te vocale e kī haka g̈eʼi tāua ʼe taʼe haka g̈eʼi. Te vocale kī haka
							g̈eʼi e hore ro ʼā a rug̈a.
						</p>
						<p class="mb-4">
							Te consonante k, m, n, p, t pe he kī hag̈a tire ʼā. Nō atu ia te tahi consonante era e
							uʼi pe nei:
						</p>
						<div class="mb-4 space-y-4">
							<div>
								<p>
									<span class="font-mono font-semibold">h–</span> Te consonante h hoʼeā ki te j o te
									vanag̈a tire, te meʼe nō e haka hahau ʼiti te kī ig̈a pe he h ʼarimani ʼo paratane, ej.:
								</p>
								<p class="ml-6 mt-1 font-mono text-sm">haha = "boca".</p>
							</div>
							<div>
								<p>
									<span class="font-mono font-semibold">ʼ–</span> Te ʼ (te ʼig̈oa he ʼeʼe) he consonante
									e tahi mo kī tāua e puru ʼiti-ʼiti te g̈uruhara:
								</p>
								<div class="ml-6 mt-1 space-y-0.5 font-mono text-sm">
									<p>he ara = "camino"</p>
									<p>he ʼara = "despertarse, levantarse"</p>
									<p>he hau = "lienza; hilo"</p>
									<p>he haʼu = "sombrero"</p>
								</div>
							</div>
							<div>
								<p>
									<span class="font-mono font-semibold">g̈–</span> Te consonante g̈ (te ʼig̈oa he ʼeg̈e)
									te kī hag̈a pe he n ena ʼā o te vanag̈a tire ana topa ʼi muʼa o te consonante c, k, qu,
									ʼo g, pe he vanag̈a era he banco, he rango, he banquete, ej.:
								</p>
								<p class="ml-6 mt-1 font-mono text-sm">g̈ag̈ata = "gente; hombres".</p>
							</div>
							<div>
								<p>
									<span class="font-mono font-semibold">r–</span> Te consonante r te kī hag̈a pe he r
									ena ʼā o te vanag̈a tire ana topa ʼi vaeg̈a o te vocale e rua, pe he vanag̈a era he caro,
									he loro. ʼIna ko kī pe he kī hag̈a ena o te r vanag̈a tire ana haʼa mata te papaʼi o
									te vanag̈a, pe he rato, risa.
								</p>
							</div>
							<div>
								<p>
									<span class="font-mono font-semibold">v–</span> Te consonante v ʼina ko kī pe he v
									poto-poto ʼo b roa-roa era o te vanag̈a tire. ʼI te rapa nui, e haka puā te niho era
									o rug̈a ki te roto o te g̈utu ana kī.
								</p>
							</div>
						</div>
						<p class="mb-3">
							Te guione ʼi te vanag̈a rapa nui mo ăg̈i-ăg̈i tāua i te vanag̈a kī haka ʼou ku ia ʼā ka
							rua, ʼo he kupu e tahi mo haka hoki o tū vanag̈a ʼā. Pe ira e topa era te haʼa auraʼa
							kē pe he vanag̈a ʼāpī e tahi.
						</p>
						<div class="mb-4 ml-6 space-y-0.5 font-mono text-sm">
							<p>topa = "bajar"</p>
							<p>to-topa = "bajar (varias personas)"</p>
							<p>topa-topa = "bajar (varias veces)"</p>
							<p>ahi = "fuego; lumbre"</p>
							<p>ahi-ahi = "tarde; atardecer"</p>
							<p>haʼere = "caminata; andar"</p>
							<p>haʼere-ʼere = "deambular, pasear"</p>
						</div>
						<p class="mb-4">
							ʼI te rapa nui, ʼina he haka piri i te vocale e rua ana kī, pe he kupu e tahi ana kī,
							pe he kī hag̈a ena ʼi te vanag̈a tire. ʼIna takoʼa he tuki i te acento; te vanag̈a, mo
							rahi rō o te kupu, e haka hag̈u ʼiti ana kī i toʼona kupu era mo tano pe nei te auraʼa:
						</p>
						<div class="mb-4 space-y-3">
							<div class="flex gap-3">
								<span class="shrink-0 font-semibold">1)</span>
								<p>
									Ana oti te vanag̈a hai vocale hore ro ʼā a rug̈a ʼe kī haka g̈eʼi, he aguda. ʼI te
									kupu hopeʼa era e haka hag̈u ana kī.
								</p>
							</div>
							<div class="flex gap-3">
								<span class="shrink-0 font-semibold">2)</span>
								<p>
									Mo ai o te vanag̈a kai oti hai vocale hore a rug̈a, he grave. E haka hag̈u ʼiti ia
									ana kī i te kupu era mo tuʼu ki te hopeʼa.
								</p>
							</div>
						</div>
						<p>
							Taʼatoʼa vanag̈a e tahi nō kupu hai vocale hore a rug̈a, e kī puai. ʼE ko tū vanag̈a tahi
							ʼana te meʼe nō ʼina he hore a rug̈a, ʼina ko kī haka pag̈ahaʼa.
						</p>
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
				<span
					>Se terminó de imprimir esta primera edición de 2.000 ejemplares en el mes de Marzo de
					1986</span
				>
				<span>IMPRESORES: Imprenta Mueller S.A.</span>
				<span>IMPRESO EN CHILE / PRINTED IN CHILE</span>
			</p>
		</div>
	</Dialog.Content>
</Dialog.Root>
