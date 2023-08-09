<script>
    import {onMount} from 'svelte'
    import {toast} from '$lib/stores.js'


    onMount(() => {
		const toastNode = document.getElementById('toast')
		toastNode.style.display = 'block'
		setTimeout(() => {
			$toast = {
    			message: '',
    			color: ''
			}
			toastNode.style.display = 'none'
		}, 3000)
    })
</script>

<div id="toast" class={"w-25 p-2 rounded shadow " + $toast.color}>
    {$toast.message}
</div>
