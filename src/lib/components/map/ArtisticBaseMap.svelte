<script lang="ts">
	import type { ExpandedLayer } from '$lib/expanded-models';
	import LocationDialog from './layers/LocationDialog.svelte';
	import { transformLatLngToXY } from '$lib/utils/geoTransform';
	import type { PruebasResponse } from '$lib/pocketbase-types';

	let {
		imageSrc,
		selectedLayers = $bindable(),
		pruebas
	}: {
		imageSrc: string;
		selectedLayers: Map<string, ExpandedLayer>;
		pruebas: PruebasResponse[];
	} = $props();

	// Zoom and pan state
	let scale = $state(1);
	let translateX = $state(0);
	let translateY = $state(0);
	let isDragging = $state(false);
	let dragStart = { x: 0, y: 0 };
	let lastTranslate = { x: 0, y: 0 };

	// Use CSS transforms with will-change for better performance
	let transformStyle = $derived(
		`transform: translate3d(${translateX}px, ${translateY}px, 0) scale(${scale}); will-change: transform;`
	);

	function handleWheel(e: WheelEvent) {
		e.preventDefault();
		const delta = -e.deltaY * 0.002; // Increased sensitivity
		const newScale = Math.min(Math.max(0.5, scale + delta), 5);
		scale = newScale;
	}

	function handleMouseDown(e: MouseEvent) {
		if (e.button !== 0) return;
		isDragging = true;
		dragStart = { x: e.clientX, y: e.clientY };
		lastTranslate = { x: translateX, y: translateY };
	}

	function handleMouseMove(e: MouseEvent) {
		if (!isDragging) return;
		const dx = e.clientX - dragStart.x;
		const dy = e.clientY - dragStart.y;
		translateX = lastTranslate.x + dx;
		translateY = lastTranslate.y + dy;
	}

	function handleMouseUp() {
		isDragging = false;
	}

	function handleMouseLeave() {
		isDragging = false;
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="absolute inset-0 flex items-center justify-center overflow-hidden"
	style="cursor: {isDragging ? 'grabbing' : 'grab'};"
	onwheel={handleWheel}
	onmousedown={handleMouseDown}
	onmousemove={handleMouseMove}
	onmouseup={handleMouseUp}
	onmouseleave={handleMouseLeave}
>
	<div class="relative h-full" style={transformStyle}>
		<img
			src={imageSrc}
			class="h-full w-auto select-none"
			style="pointer-events: none;"
			alt="Map of Easter Island"
			draggable="false"
		/>

		{#each selectedLayers.values() as layer}
			{#each layer.expand.locations || [] as location}
				{#if location.latitude != null && location.longitude != null}
					{@const pos = transformLatLngToXY(location.latitude, location.longitude)}
					<div
						class="absolute z-10"
						style={`top: ${pos.y}%; left: ${pos.x}%; transform: translate(-50%, -50%);`}
					>
						<LocationDialog {location} layerName={layer.name} {pruebas} />
					</div>
				{/if}
			{/each}
		{/each}
	</div>
</div>
