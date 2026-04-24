<script lang="ts">
	/*This component is a dialog to display a
key for the different Agroecology icons*/

	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';
	import { faLeaf, faSeedling } from '@fortawesome/free-solid-svg-icons';

	let { open = $bindable(false) }: { open?: boolean } = $props();

	// preload mana vai icon before trying to display it
	onMount(async () => {
		const preloadImage = (src: string) => {
			return new Promise((resolve, reject) => {
				const img = new Image();
				img.onload = resolve;
				img.onerror = reject;
				img.src = src;
			});
		};

		try {
			await preloadImage('mana-vai-icon.png');
		} catch (error) {
			console.error('Failed to preload Mana Vai Icon:', error);
		}
	});
</script>

<Dialog.Root bind:open>
	<Dialog.Content
		class="max-w-screen m-0 flex h-[70vh] w-[70vw] flex-col gap-0 bg-gradient-to-b from-amber-50 to-orange-50 p-0 text-amber-900"
		style="font-family: 'Merriweather', serif;"
	>
		<!-- Header -->
		<Dialog.Title class="mb-6 mt-6 text-center text-4xl font-bold tracking-wide">
			{'Ono Tupuna'}
		</Dialog.Title>

		<!-- Key Content -->
		<div class="mt-6 flex flex-row items-center justify-center gap-8">
			<div class="flex max-w-xs flex-col items-center gap-6">
				<div class="flex w-16 justify-center">
					<Fa icon={faLeaf} color="blue" size="3x" />
				</div>
				<div class="text-center">
					<h3 class="text-xl font-semibold text-amber-900">Plantas cultivables</h3>
					<p class="invisible">Text here forces vertical alignment</p>
				</div>
			</div>

			<div class="flex max-w-xs flex-col items-center gap-6">
				<div class="flex w-16 justify-center">
					<Fa icon={faSeedling} color="blue" size="3x" />
				</div>
				<div class="text-center">
					<h3 class="text-xl font-semibold text-amber-900">Plantas medicinales</h3>
					<p class="text-amber-700">Plantas nativas y plantas introducidas</p>
				</div>
			</div>

			<div class="flex max-w-xs flex-col items-center gap-2">
				<div class="flex w-16 justify-center">
					<!-- Mana Vai Icon Source: flaticon.com  -->
					<img src="mana-vai-icon.png" alt="Mana Vai" style="width: 4rem; height: 4rem;" />
				</div>
				<div class="text-center">
					<h3 class="text-xl font-semibold text-amber-900">Mana Vai</h3>
					<p class="text-amber-700">Sistema agrícola ancestral Rapa Nui</p>
				</div>
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
