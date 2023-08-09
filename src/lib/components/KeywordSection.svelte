<script>
	import KeywordItem from '$lib/components/KeywordItem.svelte';
	import Fa from 'svelte-fa/src/fa.svelte'
	import { faPlus } from '@fortawesome/free-solid-svg-icons/index.js'
	import {KW, currentChunk} from '$lib/stores.js';
	import { onMount } from 'svelte'
	import deselectChunk from '$lib/util/deselectChunk.js';

	onMount(() => {
		document.querySelectorAll('#keyword-section .accordion-button').forEach(n => {
			n.addEventListener('click', e => {
				$currentChunk = ''
				deselectChunk()
				return
			})
		})
	})

</script>

<!-- section heading -->
<div class="p-1 d-flex justify-content-end bg-primary text-light">
	<div class="flex-grow-1 align-self-center">
		<span class="h6 m-0">Keywords</span>
		<span class="badge pb-1 bg-secondary text-dark">{Object.keys($KW).length}</span>
	</div>
	<button 
		type="button" 
		class="btn btn-sm btn-outline-secondary text-light ms-2" 
		data-bs-toggle="modal"
		data-bs-target="#kw-modal-load"
	>
		<b>
			<Fa icon={faPlus} />
			Load
		</b>
	</button>
</div>

<!-- section body -->
<div class="accordion accordion-flush" id="keyword-section">
	{#each Object.entries($KW) as [kw, v]}
		<KeywordItem data={{ kw, ...v }} />
	{/each}
</div>