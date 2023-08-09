<script>
	import KeywordSection from '$lib/components/KeywordSection.svelte';
	import MatchesSection from '$lib/components/MatchesSection.svelte';
	import ExistingKeywordSection from '$lib/components/ExistingKeywordSection.svelte';
	import NewKeywordSection from '$lib/components/NewKeywordSection.svelte';
	import Control from '$lib/components/Control.svelte';
	import KeywordModalLoad from '$lib/components/KeywordModalLoad.svelte';
	import ExistingKeywordModalLoad from '$lib/components/ExistingKeywordModalLoad.svelte';

</script>

<main class="container-fluid flex-grow-1 overflow-hidden">
	<div class="row h-100 mx-1">
		<div class="col-3 d-flex flex-column overflow-hidden h-100 me-3 p-0 bg-tertiary">
			<KeywordSection/>
		</div>
		<div class="col h-100 d-flex flex-column justify-content-end">
			<div class="row flex-grow-1 overflow-hidden">
				<div class="col-6 h-100 me-3 p-0 bg-tertiary">
					<MatchesSection heading='Matches' matchType='main' />
					<MatchesSection heading='Extended Matches' matchType='extended' />
				</div>
				<div class="col-3 h-100 me-3 p-0 bg-tertiary">
					<ExistingKeywordSection />
				</div>
				<div class="col h-100 p-0 bg-tertiary">
					<NewKeywordSection />
				</div>
			</div>
			<div class="row mt-3">
				<div class="col p-3 bg-tertiary">
					<Control/>
				</div>
			</div>
		</div>
	</div>
</main>
<KeywordModalLoad/>
<ExistingKeywordModalLoad/>