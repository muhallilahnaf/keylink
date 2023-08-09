<script>
	import '../app.scss';
	import brandLogo from '$lib/assets/keylink.svg'
	import Fa from 'svelte-fa/src/fa.svelte'
	import { faGithub } from '@fortawesome/free-brands-svg-icons/index.js'
	import { onMount } from 'svelte'
	import {toast} from '$lib/stores.js'
	import Toast from '$lib/components/Toast.svelte'


	onMount(() => {
		import('bootstrap/dist/js/bootstrap.min.js');
	})
</script>

<svelte:head>
	<title>Keylink</title>
</svelte:head>

<div class="container-fluid d-flex flex-column h-100 w-100 p-0">
	<nav class="navbar navbar-expand w-100 border-bottom border-5 border-light bg-brand">
		<div class="container-fluid d-flex justify-content-between">
			<a class="navbar-brand ms-2 text-light" href="/">
				<span class="">
					<img src={brandLogo} alt="keylink" width="30" height="26" />
				</span>
				<span>
					Keylink
				</span>
			</a>
			<!-- <div class="input-group input-group-sm w-25">
				<input 
					type="text" 
					id="project-name" 
					class="form-control shadow-none bg-brand border-secondary" 
					placeholder="Project Name"
					aria-label="Project Name"
				>
			</div> -->
			{#if ($toast.message != '')}
				<Toast />
			{/if}
			<ul class="navbar-nav">
				<li class="nav-item">
					<a 
						class="nav-link text-light" 
						href="https://github.com/muhallilahnaf/keylink">
						<b>
							<Fa icon={faGithub} size="lg" />
						</b>
					</a>
				</li>
			</ul>
		</div>
	</nav>
	<slot />
</div>
