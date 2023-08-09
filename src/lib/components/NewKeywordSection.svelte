<script>
	import NewKeywordItem from './NewKeywordItem.svelte';
	import Fa from 'svelte-fa/src/fa.svelte'
	import { faCopy } from '@fortawesome/free-solid-svg-icons/index.js'
	import {newKW, toast} from '$lib/stores.js';


	const copyNewKW = () => {
		navigator.clipboard.writeText(Object.keys($newKW).join('\n'))
		$toast = {
			message: 'New keywords copied',
			color: 'bg-success text-light'
		}
	}

</script>

<div class="d-flex flex-column h-100 overflow-hidden">

	<!-- section heading -->
	<div class="p-1 d-flex justify-content-end bg-primary text-light">
		<div class="flex-grow-1 align-self-center">
			<span class="h6 m-0">New Keywords</span>
			<span class="badge pb-1 bg-secondary text-dark">{Object.keys($newKW).length}</span>
		</div>
		<button 
			type="button" 
			class="btn btn-sm btn-outline-secondary text-light ms-2"
			on:click={copyNewKW}	
		>
			<b>
				<Fa icon={faCopy} />
			</b>
		</button>
	</div>

	<!-- section body -->
	<div class="overflow-y-auto px-2">
		{#each Object.entries($newKW) as [kw, lsi]}
			<NewKeywordItem {kw} />
		{/each}
	</div>
</div>

