<script lang="ts">
	import type { Editor } from '@tiptap/core';

	interface Props {
		editor: Editor | null;
	}

	let { editor }: Props = $props();
</script>

<div class="mb-4 flex w-auto justify-start gap-2 font-bold text-amber-900">
	<button
		onclick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
		class:active={editor?.isActive('heading', { level: 1 })}
		class="rounded px-2 py-1 transition hover:bg-amber-100"
	>
		Title
	</button>

	<button
		onclick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
		class:active={editor?.isActive('heading', { level: 2 })}
		class="rounded px-2 py-1 transition hover:bg-amber-100"
	>
		Subtitle
	</button>

	<button
		onclick={() => editor?.chain().focus().setParagraph().run()}
		class:active={editor?.isActive('paragraph')}
		class="rounded px-2 py-1 transition hover:bg-amber-100"
	>
		Normal
	</button>

	<button
		onclick={() => editor?.chain().focus().toggleHeading({ level: 5 }).run()}
		class:active={editor?.isActive('heading', { level: 5 })}
		class="rounded px-2 py-1 transition hover:bg-amber-100"
	>
		Test
	</button>
</div>

<style>
	button.active {
		background: #fde68a;
		transition: background-color 0.2s ease;
	}
	button.active:hover {
		background: #fef3c7;
	}
</style>
