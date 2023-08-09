<script>
	export let match = {};
	import {LSI} from '$lib/stores.js';
	import Fa from 'svelte-fa/src/fa.svelte'
	import { faCopy, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons/index.js'

	const link = 'https://www.google.com/search?q=' + match.kw.replaceAll(' ', '+')

	const updateLSI = (e, matchObj) => {
		$LSI = e.target.checked
			? [...$LSI, matchObj]
			: $LSI.filter(q => q.id != matchObj.id)
	}
</script>

<div class="form-check mb-2 mx-2">
	<input class="form-check-input" type="checkbox" id={match.id} on:change={(e) => updateLSI(e, match)} />
	<label class="form-check-label" for={match.id}>
		<span class="me-1">{match.kw}</span>
		<a class="me-1" target="_blank" href={link}>
			<Fa icon={faUpRightFromSquare} />
		</a>
		<span role="button" on:click={() => navigator.clipboard.writeText(match.kw)}>
			<Fa icon={faCopy} />
		</span>
	</label>
</div>
