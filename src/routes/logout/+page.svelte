<script lang="ts">
	import { goto } from '$app/navigation';
	import { token } from '$lib/stores';

	localStorage.clear();
	token.set(null);

	$: if ($token === null) goto('/');
</script>
