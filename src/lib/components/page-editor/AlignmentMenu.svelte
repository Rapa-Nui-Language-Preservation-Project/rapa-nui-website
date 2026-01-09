<script lang="ts">
	import type { Editor } from '@tiptap/core';

	interface Props {
		editor: Editor | null;
	}

	let { editor }: Props = $props();
</script>

<div class="mb-4 flex w-auto justify-start font-bold text-amber-900">
	<button
		onclick={() => editor?.chain().focus().setTextAlign('left').run()}
		class:active={editor?.isActive({ textAlign: 'left' })}
		class="rounded px-2 py-1 transition hover:bg-amber-100"
	>
		Left
	</button>

	<button
		onclick={() => editor?.chain().focus().setTextAlign('center').run()}
		class:active={editor?.isActive({ textAlign: 'center' })}
		class="rounded px-2 py-1 transition hover:bg-amber-100"
	>
		Center
	</button>

	<button
		onclick={() => editor?.chain().focus().setTextAlign('right').run()}
		class:active={editor?.isActive({ textAlign: 'right' })}
		class="rounded px-2 py-1 transition hover:bg-amber-100"
	>
		Right
	</button>

	<button
		onclick={() => editor?.chain().focus().setTextAlign('justify').run()}
		class:active={editor?.isActive({ textAlign: 'justify' })}
		class="rounded px-2 py-1 transition hover:bg-amber-100"
	>
		Justify
	</button>
</div>

<style>
	button.active {
		text-decoration: underline;
		color: #78350f;
	}
</style>
