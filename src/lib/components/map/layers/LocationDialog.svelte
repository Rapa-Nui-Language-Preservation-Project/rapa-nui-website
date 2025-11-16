<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import Fa from 'svelte-fa';
	import {
		faBookOpen,
		faLightbulb,
		faMapMarkerAlt,
		faCrow,
		faCirclePlay
	} from '@fortawesome/free-solid-svg-icons';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import type { ExpandedLocation } from '$lib/expanded-models';
	import KoronuiLayer from './KoronuiLayer.svelte';
	import HistPerdidasLayer from './HistPerdidasLayer.svelte';
	import AvesLayer from './AvesLayer.svelte';
	import MicroCuentasLayer from './MicroCuentasLayer.svelte';
	let { location, layerName }: { location: ExpandedLocation; layerName: string } = $props();
</script>

<Dialog.Root>
	<Dialog.Trigger class="flex flex-col items-center">
		<Tooltip.Provider delayDuration={0}>
			<Tooltip.Root>
				<Tooltip.Trigger>
					<span
						class="relative inline-block transition-transform hover:z-20 hover:scale-125 hover:drop-shadow-[0_0_4px_black]"
					>
						{#if layerName.startsWith('Aves')}
							<Fa icon={faCrow} color="blue" size="2x" />
						{:else if layerName.startsWith('A ‘AMU')}
							<Fa icon={faBookOpen} color="purple" size="2x" />
						{:else if layerName.startsWith('Koro')}
							<Fa icon={faLightbulb} color="orange" size="2x" />
						{:else if layerName.startsWith('Hist')}
							<Fa icon={faCirclePlay} color="green" size="2x" />
						{:else}
							<Fa icon={faMapMarkerAlt} color="white" size="2x" />
						{/if}
					</span>
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
