<script>
	import Chunks from '$lib/components/Chunks.svelte';

	export let data = {};

</script>

<div class="accordion-item">
	<p class="accordion-header">
		<button 
			class="accordion-button collapsed keyword p-2 shadow-none bg-tertiary" 
			type="button" 
			data-bs-toggle="collapse" 
			data-bs-target={'#' + data.id} 
			aria-expanded="false" 
			aria-controls={data.id}
		>
			{data.kw}
	  </button>
	</p>
	<div 
		id={data.id} 
		class="accordion-collapse collapse" 
		data-bs-parent="#keyword-section"
	>
		<Chunks chunks={[...data.main, ...data.extended]} />
	</div>
</div>
