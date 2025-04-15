<script>
	import ModeSwitcher from './ModeSwitcher.svelte';
</script>

<header class="flex w-screen items-center p-5">
	<div class="inline-flex justify-start" style="width: 50%;">
		<div
			class="text-faded flex h-8 w-8 items-center justify-center rounded-full bg-muted text-center"
		>
			LOGO
		</div>
	</div>
	<div class="inline-flex shrink-0 items-center"></div>
	<div class="inline-flex justify-end" style="width: 50%;">
		<ModeSwitcher />
	</div>
</header>
