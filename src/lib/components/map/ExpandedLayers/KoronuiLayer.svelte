<script lang="ts">
	import type { ExpandedLocation } from '$lib/expanded-models';
	export let location: ExpandedLocation;
	let showSpanish = false;
</script>

<!-- 
  The main container for the Koronui Layer content. 
  It's set to relative positioning to act as a container for the absolutely positioned corner buttons.
-->
<div class="relative p-4 text-foreground">
	<h2 class="text-2xl font-bold">{location.name}</h2>
	<p class="mt-2 preserve-whitespace">
		<!-- Display the appropriate description based on the showSpanish state -->
		{showSpanish ? location.description_espanol : location.description_rapa_nui}
	</p>

	<!-- Button to toggle the language of the description -->
	<button
		on:click={() => (showSpanish = !showSpanish)}
		class="mt-4 rounded-full bg-primary px-4 py-2 text-primary-foreground shadow hover:bg-primary/80"
	>
		{showSpanish ? 'Ver en Rapa Nui' : 'Ver en Español'}
	</button>

	<!-- 
    Container for the corner buttons. 
    Using `absolute inset-0` makes this div cover its parent `relative` div completely,
    which allows us to position the buttons within it easily.
  -->
	<div class="absolute inset-0">
		{#if location.expand?.actividad}
			<!-- Loop through the first four actividades to place them in the corners -->
			{#each location.expand.actividad as actividad, i}
				{@const positions = [
					'top-0 left-0', // Top-left corner
					'top-0 right-0', // Top-right corner
					'bottom-0 left-0', // Bottom-left corner
					'bottom-0 right-0' // Bottom-right corner
				]}
				<!-- We only have 4 corners, so we only display up to 4 actividades as corner buttons -->
				{#if i < 4}
					<a href={`/actividad/${actividad.id}`} class="absolute {positions[i]}">
						<button
							class="m-2 rounded-full bg-primary px-4 py-2 text-primary-foreground shadow hover:bg-primary/80"
						>
							{actividad.title}
						</button>
					</a>
				{/if}
			{/each}
		{/if}
	</div>
</div>
