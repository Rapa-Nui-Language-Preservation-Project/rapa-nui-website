<script lang="ts">
	import type { Editor } from '@tiptap/core';

	interface Props {
		editor: Editor | null;
	}

	let { editor }: Props = $props();
</script>

<div class="mb-4 flex w-auto justify-start gap-2 font-bold text-amber-900">
	<button
		onclick={() => editor?.chain().focus().setColor('#78350f').run()}
		class:active={editor?.isActive({ textColor: '#78350f' })}
		class="rounded bg-amber-100 px-2 py-1 transition hover:bg-amber-200"
	>
		Dark
	</button>

	<button
		onclick={() => editor?.chain().focus().setColor('#b45309').run()}
		class:active={editor?.isActive({ textColor: '#b45309' })}
		class="rounded bg-amber-100 px-2 py-1 text-amber-700 transition hover:bg-amber-200"
	>
		Light
	</button>
</div>

<style>
	button.active {
		text-decoration: underline;
		color: #78350f;
	}
</style>
