<script lang="ts">
	import * as Drawer from '$lib/components/ui/drawer';
	import { Button } from '$lib/components/ui/button';
</script>

<!-- Bottom Drawer -->
<div class="absolute bottom-16 left-1/2 -translate-x-1/2">
	<Drawer.Root>
		<Drawer.Trigger>
			<Button class="w-64 py-8 text-2xl">Maps & Layers</Button>
		</Drawer.Trigger>
		<Drawer.Content>
			<Drawer.Header>
				<Drawer.Title>Are you sure absolutely sure?</Drawer.Title>
				<Drawer.Description>This action cannot be undone.</Drawer.Description>
			</Drawer.Header>
			<Drawer.Footer>
				<Button>Submit</Button>
				<Drawer.Close>Cancel</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
</div>
