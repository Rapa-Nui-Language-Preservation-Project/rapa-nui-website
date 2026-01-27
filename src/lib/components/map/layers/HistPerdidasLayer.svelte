<script lang="ts">
	import type { ExpandedLocation } from '$lib/expanded-models';
	import Youtube from 'svelte-youtube-embed';
	let { location }: { location: ExpandedLocation } = $props();

	// Video modal state
	let showLargeVideo = $state(false);

	function openLargeVideo() {
		showLargeVideo = true;
	}

	function closeLargeVideo() {
		showLargeVideo = false;
	}
</script>

<h1 class="text-xl font-bold">{location.name}</h1>
<p class="text-md preserve-whitespace text-center font-normal">
	{location.description_espanol}
</p>
{#if !showLargeVideo}
	<div class="flex items-center justify-center">
		<button
			type="button"
			onclick={openLargeVideo}
			class="group relative w-full max-w-2xl cursor-pointer"
			title="Clic para ver video más grande"
		>
			<div class="max-h-[400px] overflow-hidden">
				<Youtube id={location.description_rapa_nui} thumbnail={undefined} play_button={undefined} />
			</div>
			<div
				class="absolute right-2 top-2 rounded-full bg-green-600/70 p-2 opacity-0 transition-opacity group-hover:opacity-100"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5 text-white"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M7 17L17 7M17 7H8M17 7V16" />
				</svg>
			</div>
		</button>
	</div>
{/if}

<!-- Large Video Modal -->
{#if showLargeVideo}
	<div
		role="dialog"
		aria-modal="true"
		aria-label="Large video player"
		tabindex="-1"
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
		onclick={closeLargeVideo}
		onkeydown={(e) => {
			if (e.key === 'Escape') {
				e.preventDefault();
				closeLargeVideo();
			}
		}}
	>
		<button
			type="button"
			aria-label="Close video"
			class="absolute right-4 top-4 rounded-full bg-white p-2 text-black hover:bg-gray-200"
			onclick={closeLargeVideo}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
			>
				<line x1="18" y1="6" x2="6" y2="18"></line>
				<line x1="6" y1="6" x2="18" y2="18"></line>
			</svg>
		</button>
		<div
			class="aspect-video w-[90vw] max-w-4xl"
			onclick={(e) => e.stopPropagation()}
			role="presentation"
		>
			<Youtube id={location.description_rapa_nui} thumbnail={undefined} play_button={undefined} />
		</div>
	</div>
{/if}
