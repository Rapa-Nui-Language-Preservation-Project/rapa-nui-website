<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { MapPin, Bird, Circle, SquarePlay } from 'lucide-svelte';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import type { ExpandedLocation } from '$lib/expanded-models';
	import KoronuiLayer from '$lib/components/map/ExpandedLayers/KoronuiLayer.svelte';
	import HistPerdidasLayer from './ExpandedLayers/HistPerdidasLayer.svelte';
	import AvesLayer from './ExpandedLayers/AvesLayer.svelte';
	import MicroCuentasLayer from './ExpandedLayers/MicroCuentasLayer.svelte';
	let { location, layerName }: { location: ExpandedLocation; layerName: string } = $props();
</script>

<Dialog.Root>
	<Dialog.Trigger class="flex flex-col items-center">
		<Tooltip.Provider delayDuration={0}>
			<Tooltip.Root>
				<Tooltip.Trigger>
					{#if layerName.startsWith('Aves')}
						<Bird color="blue" size=48 />
					{:else if layerName.startsWith('A ‘AMU')}
						<MapPin color="purple" size = 32 />
					{:else if layerName.startsWith('Koro')}
						<Circle color="red" size=48 />
					{:else if layerName.startsWith('Hist')}
						<SquarePlay color="green" size=32 />
					{:else}
						<MapPin color="white" />
					{/if}
				</Tooltip.Trigger>
				<Tooltip.Content side="bottom" class="z-50 border-none bg-transparent shadow-none">
					<div class="drop-shadow-xs font-bold text-white">{location.name}</div>
				</Tooltip.Content>
			</Tooltip.Root>
		</Tooltip.Provider>
	</Dialog.Trigger>
	<Dialog.Content
		class="max-w-screen m-0 h-[90vh] w-[90vw] bg-gradient-to-b from-amber-50 to-orange-50 text-amber-900"
	>
		<ScrollArea> 
			<div class="flex flex-col items-center">
				{#if layerName.startsWith('Koro')}
					<KoronuiLayer {location} />

				{:else if layerName.startsWith('Aves')}
					<AvesLayer {location} />

				{:else if layerName.startsWith('A ‘AMU')}
					<MicroCuentasLayer {location} />

				{:else if layerName.startsWith('Hist')}
					<HistPerdidasLayer {location} />
				{/if}
			</div>
		</ScrollArea>
	</Dialog.Content>
</Dialog.Root>
