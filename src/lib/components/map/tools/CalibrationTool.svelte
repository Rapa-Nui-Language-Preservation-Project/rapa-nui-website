<script lang="ts">
	let clicks: { x: number; y: number }[] = [];

	function handleClick(event: MouseEvent) {
		const rect = (event.currentTarget as HTMLImageElement).getBoundingClientRect();
		const x = ((event.clientX - rect.left) / rect.width) * 100;
		const y = ((event.clientY - rect.top) / rect.height) * 100;

		clicks = [...clicks, { x, y }];
		console.log(`Clicked at: x=${x.toFixed(2)}%, y=${y.toFixed(2)}%`);
	}
</script>

<div class="relative">
	<img
		src="http://127.0.0.1:8090/api/files/ia77ailu3ghoodv/6jjx168s5ezt2m8/map_k7mm569qll.png"
		class="h-screen cursor-crosshair"
		onclick={handleClick}
		alt="Artistic map for calibration"
	/>

	{#each clicks as { x, y }, i}
		<div
			class="marker"
			style={`top: ${y}%; left: ${x}%; position: absolute;`}
			title={`Point ${i + 1}: ${x.toFixed(2)}%, ${y.toFixed(2)}%`}
		></div>
	{/each}
</div>

