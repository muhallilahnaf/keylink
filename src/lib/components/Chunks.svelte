<script>
	export let chunks = [];

	import {currentChunk} from '$lib/stores.js';
	import deselectChunk from '$lib/util/deselectChunk.js';

	const updateCurrentChunk = (e, chunk) => {
		$currentChunk = chunk
		deselectChunk()
		e.target.classList.add('selected')
	}

</script>

<div class="accordion-body p-0 border-start border-2 border-secondary bg-tertiary">
	<ul class="list-group list-group-flush ms-3">
		{#each chunks as chunk}
			<li 
				role="button"
				class="list-group-item bg-tertiary chunk ps-1" 
				on:click={(e) => updateCurrentChunk(e, chunk)}
			>
				{chunk}
			</li>
		{/each}
	</ul>
</div>