<script lang="ts">
	import { onMount } from 'svelte';
	import type { PDFDocumentProxy } from 'pdfjs-dist';

	let { src, title }: { src: string; title: string } = $props();

	let container: HTMLDivElement;
	let loading = $state(true);
	let error = $state<string | null>(null);

	const workerSrc = new URL('pdfjs-dist/build/pdf.worker.mjs', import.meta.url).toString();
	const maxRenderScale = 1.4;

	onMount(() => {
		let cancelled = false;

		const render = async () => {
			try {
				loading = true;
				error = null;
				container.replaceChildren();

				const pdfjs = await import('pdfjs-dist');
				pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

				const pdf = await pdfjs.getDocument(src).promise;
				if (cancelled) return;

				await renderPdf(pdf, () => cancelled);
			} catch {
				if (!cancelled) {
					error = 'No se pudo cargar el PDF.';
				}
			} finally {
				if (!cancelled) {
					loading = false;
				}
			}
		};

		render();

		return () => {
			cancelled = true;
			container.replaceChildren();
		};
	});

	async function renderPdf(pdf: PDFDocumentProxy, isCancelled: () => boolean) {
		for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
			if (isCancelled()) return;

			const page = await pdf.getPage(pageNumber);
			const unscaledViewport = page.getViewport({ scale: 1 });
			const containerWidth = container.clientWidth;
			const fitScale = containerWidth > 0 ? containerWidth / unscaledViewport.width : 1;
			const renderScale = Math.min(fitScale, maxRenderScale);
			const viewport = page.getViewport({ scale: renderScale });
			const outputScale = window.devicePixelRatio || 1;

			const canvas = document.createElement('canvas');
			const context = canvas.getContext('2d');

			if (!context) continue;

			canvas.width = Math.floor(viewport.width * outputScale);
			canvas.height = Math.floor(viewport.height * outputScale);
			canvas.style.width = `${viewport.width}px`;
			canvas.style.height = 'auto';
			canvas.className = 'mx-auto mb-4 block max-w-full rounded bg-white shadow';

			container.appendChild(canvas);

			await page.render({
				canvas,
				canvasContext: context,
				viewport,
				transform: outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : undefined
			}).promise;
		}
	}
</script>

<div class="w-full">
	<div class="mb-2 flex items-center justify-between gap-4">
		<p class="min-w-0 truncate text-xs italic text-muted-foreground">{title}</p>
		<a
			href={src}
			target="_blank"
			rel="noopener noreferrer"
			class="shrink-0 text-sm font-medium text-amber-700 underline underline-offset-2 hover:text-amber-900"
		>
			Abrir PDF
		</a>
	</div>

	<div
		class="max-h-[70vh] min-h-[45vh] w-full overflow-y-auto rounded-lg border border-amber-200 bg-neutral-900 p-4 shadow-lg"
	>
		{#if loading}
			<p class="text-sm text-amber-100">Cargando PDF...</p>
		{/if}

		{#if error}
			<div class="rounded bg-amber-50 p-4 text-sm text-amber-900">
				<p>{error}</p>
				<a
					class="font-medium underline underline-offset-2"
					href={src}
					target="_blank"
					rel="noreferrer"
				>
					Abrir en una pestaña nueva
				</a>
			</div>
		{/if}

		<div bind:this={container}></div>
	</div>
</div>
