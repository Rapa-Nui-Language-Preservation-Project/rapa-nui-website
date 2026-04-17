<script lang="ts">
	import type { PageData } from './$types';
	import type { LanguageBook } from './+page.server';

	let { data }: { data: PageData } = $props();

	interface Section {
		label: string;
		books: LanguageBook[];
	}

	const defaultPosClasses = [
		'left-1/2 top-0 -translate-x-1/2 -translate-y-1/2',
		'right-0 top-1/2 translate-x-1/2 -translate-y-1/2',
		'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2'
	];
	const twoItemPosClasses = [
		'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2',
		'right-0 top-1/2 translate-x-1/2 -translate-y-1/2'
	];

	const sections = $derived.by((): Section[] => {
		const result: Section[] = [
			{
				label: 'Serie Salmón',
				books: [
					{
						title: 'Mai ki Hāpī Tātou',
						subtitle: 'Repaso',
						cover: '/language/salmon-1-cover.png',
						pdf: '/language/mai ki hapi tatou salmon-1.pdf'
					},
					{
						title: 'Mai ki Hāpī Tātou',
						subtitle: 'Te Rua Puka',
						cover: '/language/salmon-2-cover.png',
						pdf: '/language/mai ki hapi tatou salmon-2.pdf'
					},
					{
						title: 'Mai ki Hāpī Tātou',
						subtitle: 'Te Rua Puka 2 — Segundo Libro',
						cover: '/language/salmon-2-7-cover.png',
						pdf: '/language/mai ki hapi tatou salmon-2-7.pdf'
					},
					{
						title: 'Mai ki Hāpī Tātou',
						subtitle: 'Guía Didáctica',
						cover: '/language/salmon-3-cover.png',
						pdf: '/language/mai ki hapi tatou salmon-3pdf.pdf'
					}
				]
			},
			{
				label: 'Edición Verde',
				books: data.edicionVerdeBooks
			}
		];

		if (data.inaKoMouBook) {
			result.push({
				label: 'Ina Ko Mou',
				books: [data.inaKoMouBook]
			});
		}

		return result;
	});

	const posClasses = $derived(sections.length === 2 ? twoItemPosClasses : defaultPosClasses);

	let selectedSection = $state<number | null>(null);

	function goBack() {
		selectedSection = null;
	}
</script>

<div
	class="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50"
	style="font-family: 'Merriweather', serif;"
>
	<!-- Top bar with back button -->
	<div class="border-b border-amber-200 bg-amber-100/50 px-6 py-4">
		<a
			href="/"
			class="inline-block rounded-lg bg-amber-700 px-4 py-2 text-white shadow transition-colors hover:bg-amber-800"
		>
			&larr; Volver a mapa
		</a>
	</div>

	<div
		class="mx-auto px-6 py-10"
		class:max-w-5xl={selectedSection === null}
		class:max-w-7xl={selectedSection !== null}
	>
		{#if selectedSection === null}
			<!-- Landing view with circular navigation -->
			<div class="text-center">
				<h1 class="mb-2 text-3xl font-bold text-amber-900 md:text-4xl">
					Materiales de aprendizaje de Rapa Nui
				</h1>
				<p class="mb-16 text-lg text-amber-700">
					Mai ki Hāpī Tātou i te Tai'o 'e i te Pāpa'i i to Tātou 'Arero Rapa Nui
				</p>
			</div>

			<!-- Circular navigation -->
			<div class="relative mx-auto mb-16 mt-8 h-40 w-72">
				<div class="absolute inset-0 rounded-full border-2 border-amber-500 opacity-30"></div>

				{#each sections as section, i}
					<button
						class={`absolute ${posClasses[i]}
							rounded-full bg-amber-700 px-6 py-3
							text-sm font-semibold text-white shadow-lg
							transition-colors hover:bg-amber-800`}
						onclick={() => (selectedSection = i)}
					>
						{section.label}
					</button>
				{/each}
			</div>
		{:else}
			<!-- Section detail view -->
			<div class="mb-6">
				<button
					onclick={goBack}
					class="rounded-lg bg-amber-700 px-4 py-2 text-white shadow transition-colors hover:bg-amber-800"
				>
					&larr; Volver
				</button>
			</div>

			<h2 class="mb-8 text-center text-2xl font-bold text-amber-900 md:text-3xl">
				{sections[selectedSection].label}
			</h2>

			<div class="mx-auto flex max-w-7xl flex-wrap justify-center gap-6">
				{#each sections[selectedSection].books as book}
					<a
						href={book.pdf}
						target="_blank"
						rel="noopener noreferrer"
						class="group block w-full max-w-[14rem] overflow-hidden rounded-lg bg-white shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl sm:max-w-[15rem] md:max-w-[16rem]"
					>
						<div class="aspect-[3/4] overflow-hidden bg-amber-100">
							{#if book.cover}
								<img
									src={book.cover}
									alt={book.title}
									class="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
								/>
							{:else}
								<!-- Placeholder when no cover image is available -->
								<div
									class="flex h-full w-full items-center justify-center bg-gradient-to-b from-amber-200 to-amber-300"
								>
									<span class="px-4 text-center text-sm font-semibold text-amber-900">
										{book.title}
									</span>
								</div>
							{/if}
						</div>
						<div class="p-3">
							<p class="text-sm font-semibold text-amber-900">{book.title}</p>
							{#if book.subtitle}
								<p class="mt-1 text-xs text-amber-600">{book.subtitle}</p>
							{/if}
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</div>
</div>
