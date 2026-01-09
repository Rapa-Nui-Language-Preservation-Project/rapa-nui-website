<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import BubbleMenu from '@tiptap/extension-bubble-menu';
	import TextAlign from '@tiptap/extension-text-align';
	import { Color, TextStyle } from '@tiptap/extension-text-style';
	import TextMenu from './TextMenu.svelte';
	import AlignmentMenu from './AlignmentMenu.svelte';
	import ColorMenu from './ColorMenu.svelte';

	let bubbleMenu: HTMLElement | undefined = $state();
	let element: HTMLElement | undefined = $state();
	let editorState = $state({ editor: null as Editor | null });

	// menu flags
	let showTextMenu = $state(false);
	let showAlignMenu = $state(false);
	let showColorMenu = $state(false);

	onMount(() => {
		editorState.editor = new Editor({
			element: element,
			extensions: [
				StarterKit,
				BubbleMenu.configure({
					element: bubbleMenu
				}),
				TextAlign.configure({
					types: ['heading', 'paragraph']
				}),
				TextStyle,
				Color
			],
			content: `
        <h1>Tiptap WYSIWYG editor </h1>
        <h2>Testing adding new text here</h2>
        <h5>This is a test</h5>
        <p>This editor is running in Svelte.</p>
        <p>Select some text to see the bubble menu popping up.</p>
      `,
			onTransaction: ({ editor }) => {
				// Increment the state signal to force a re-render
				editorState = { editor };
			}
		});
	});
	onDestroy(() => {
		editorState.editor?.destroy();
	});
</script>

<div class="relative flex min-h-screen flex-col items-center justify-center p-8">
	<div
		bind:this={element}
		class="h-[600px] w-[90%] max-w-3xl overflow-y-auto rounded bg-gradient-to-b from-amber-50 to-orange-50 p-8 font-serif shadow"
	>
		<!-- Menu toggle buttons -->
		<div class="mb-4">
			<button
				onclick={() => (showTextMenu = !showTextMenu)}
				class="rounded bg-amber-900 px-4 py-2 font-bold text-white transition hover:bg-amber-800"
			>
				Text
			</button>
			<button
				onclick={() => (showAlignMenu = !showAlignMenu)}
				class="rounded bg-amber-900 px-4 py-2 font-bold text-white transition hover:bg-amber-800"
			>
				Alignment
			</button>
			<button
				onclick={() => (showColorMenu = !showColorMenu)}
				class="rounded bg-amber-900 px-4 py-2 font-bold text-white transition hover:bg-amber-800"
			>
				Color
			</button>
		</div>

		<!-- Menus -->
		{#if editorState.editor && showTextMenu}
			<TextMenu editor={editorState.editor}></TextMenu>
		{/if}

		{#if editorState.editor && showAlignMenu}
			<AlignmentMenu editor={editorState.editor}></AlignmentMenu>
		{/if}

		{#if editorState.editor && showColorMenu}
			<ColorMenu editor={editorState.editor}></ColorMenu>
		{/if}
	</div>
</div>

<!-- Bubble menu -->
<!-- TODO: Menu appears offset to the left when it first loads. -->
<!-- TODO: Modularize or combine with color to be 'formatting' menu -->
<div class="bubble-menu" bind:this={bubbleMenu}>
	{#if editorState.editor}
		<button
			onclick={() => editorState.editor?.chain().focus().toggleBold().run()}
			class="font-bold"
		>
			B
		</button>
		<button onclick={() => editorState.editor?.chain().focus().toggleItalic().run()} class="italic">
			I
		</button>
		<button
			onclick={() => editorState.editor?.chain().focus().toggleUnderline().run()}
			class="underline"
		>
			U
		</button>
		<button
			onclick={() => editorState.editor?.chain().focus().toggleStrike().run()}
			class="line-through"
		>
			S
		</button>
	{/if}
</div>

<style>
	.bubble-menu {
		display: flex;
		background-color: #0d0d0d;
		padding: 0.2rem;
		border-radius: 0.5rem;
		transition:
			visibility 0.1s ease,
			opacity 0.1s ease;
	}

	.bubble-menu button {
		border: none;
		background: none;
		color: #fff;
		font-weight: 500;
		padding: 0 0.2rem;
		opacity: 0.6;
		margin: 0;
	}

	.bubble-menu button:hover {
		opacity: 1;
	}
</style>
