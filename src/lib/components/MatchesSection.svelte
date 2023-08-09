<script>
	import MatchesItem from './MatchesItem.svelte';

	import {currentChunk, KW} from '$lib/stores.js';

	export let matchType = 'main';
	export let heading = 'Matches';

	const updateMatches = (allKW, chunk) => {
		let temp = []
		for (const [k, v] of Object.entries(allKW)) {
			if (v[matchType].includes(chunk)) {
				temp.push({
					kw: k,
					id: v.id
				})
			}
		}
		return temp
	}

	$: matches = updateMatches($KW, $currentChunk)

</script>

<div class="row h-50">
	<div class="d-flex flex-column h-100">
		<!-- section heading -->
		<div class="py-2 px-1 d-flex justify-content-end bg-primary text-light">
			<div class="flex-grow-1 align-self-center">
				<span class="h6 m-0">{heading}</span>
				<span class="badge pb-1 bg-secondary text-dark">{matches.length}</span>
			</div>
		</div>

		<!-- section body -->
		<div class="overflow-y-auto px-2">
			{#each matches as match}
				<MatchesItem {match} />
			{/each}
		</div>
	</div>
</div>
