<script>
	import {LSI, KW, currentChunk, newKW, toast} from '$lib/stores.js';
	import Fa from 'svelte-fa/src/fa.svelte'
	import { faCopy } from '@fortawesome/free-solid-svg-icons/index.js'

	$: textLSI = $LSI.map(q => q.kw).join(', ')

	const copyLSI = () => {
		const text = document.getElementById('lsi').value
		navigator.clipboard.writeText(text)
		$toast = {
		    message: 'LSI copied to clipboard.',
		    color: 'bg-success text-light'
		}
	}

	const confirmNewKW = () => {
		const pkNode = document.getElementById('pk')
		const pk = pkNode.value.trim()
		if (pk == '') {
			$toast = {
			    message: 'Error: Primary keyword is empty.',
			    color: 'bg-danger text-light'
		    }
			return
		}
		const idLSI = $LSI.map(q => q.id)
		const kwLSI = $LSI.map(q => q.kw)
		let tempKW = {}
		for (const [kw, v] of Object.entries($KW)) {
			if (kw != pk && !idLSI.includes(v.id)) {
				tempKW[kw] = v
			}
		}
		$KW = tempKW
		$currentChunk = ''
		$LSI = []
		pkNode.value = ''
		$newKW = {...$newKW, [pk]: kwLSI}
		$toast = {
		    message: 'New keyword added.',
		    color: 'bg-success text-light'
		}
	}
</script>

<div class="row">
	<div class="col-6">
		<div class="input-group input-group-sm mb-3">
			<span class="input-group-text bg-light" id="label-pk">Primary Keyword</span>
			<input
				type="text"
				id="pk"
				class="form-control bg-light"
				aria-label="Primary Keyword"
				aria-describedby="label-pk"
			/>
		</div>
		<div class="mb-3">
			<button 
				type="button" 
				class="btn btn-sm btn-primary text-light"
				on:click={confirmNewKW}
			>
				Confirm New Keyword
			</button>
		</div>		
	</div>
	<div class="col-6">
		<div class="input-group input-group-sm mb-3">
			<span class="input-group-text bg-light">LSI</span>
			<textarea 
				id="lsi"
				rows="3" 
				class="form-control shadow-none bg-light" 
				aria-label="LSI" 
				aria-describedby="copy-lsi"
				value={textLSI}
			/>
			<button 
				class="btn btn-outline-secondary shadow-none bg-light text-dark" 
				type="button"
				id="copy-lsi"
				on:click={copyLSI}
			>
			<Fa icon={faCopy} />
			</button>
		</div>		
	</div>
</div>
