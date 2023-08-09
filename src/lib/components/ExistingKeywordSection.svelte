<script>
	import ExistingKeywordItem from './ExistingKeywordItem.svelte';
	import Fa from 'svelte-fa/src/fa.svelte'
	import { faPlus } from '@fortawesome/free-solid-svg-icons/index.js'
	import {currentChunk, existingKW} from '$lib/stores.js';

	$: currentExistingKW = ($currentChunk == '')
		? $existingKW
		: $existingKW.filter(item => item.lemma.includes($currentChunk))
</script>

<div class="d-flex flex-column h-100 overflow-hidden">

	<!-- section heading -->
	<div class="p-1 d-flex justify-content-end bg-primary text-light">
		<div class="flex-grow-1 align-self-center">
			<span class="h6 m-0">Existing Keywords</span>
			<span class="badge pb-1 bg-secondary text-dark">{currentExistingKW.length}</span>
		</div>
		<button 
			type="button" 
			class="btn btn-sm btn-outline-secondary text-light ms-2"
			data-bs-toggle="modal"
			data-bs-target="#existing-kw-modal-load"	
		>
			<b>
				<Fa icon={faPlus} />
				Load
			</b>
		</button>
	</div>

	<!-- section body -->
	<div class="overflow-y-auto px-2">
		{#each currentExistingKW as item}
			<ExistingKeywordItem kw={item.kw} />
		{/each}
	</div>
</div>
