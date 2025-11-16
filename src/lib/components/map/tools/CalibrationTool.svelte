<script lang="ts">
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

	let clicks: { x: number; y: number }[] = [];

	function handleClick(event: MouseEvent) {
		const rect = (event.currentTarget as HTMLButtonElement).getBoundingClientRect();
		const x = ((event.clientX - rect.left) / rect.width) * 100;
		const y = ((event.clientY - rect.top) / rect.height) * 100;

		clicks = [...clicks, { x, y }];
		console.log(`Clicked at: x=${x.toFixed(2)}%, y=${y.toFixed(2)}%`);
	}
</script>

<div class="relative">
	<button
		type="button"
		on:click={handleClick}
		class="cursor-crosshair border-0 bg-transparent p-0"
		aria-label="Marcar punto en mapa de calibración"
	>
		<img
			src={`${PUBLIC_POCKETBASE_URL}/files/ia77ailu3ghoodv/6jjx168s5ezt2m8/map_k7mm569qll.png`}
			class="h-screen"
			alt="Artistic map for calibration"
		/>
	</button>

	{#each clicks as { x, y }, i}
		<div
			class="marker"
			style={`top: ${y}%; left: ${x}%; position: absolute;`}
			title={`Point ${i + 1}: ${x.toFixed(2)}%, ${y.toFixed(2)}%`}
		></div>
	{/each}
</div>
