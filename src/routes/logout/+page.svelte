<script lang="ts">
	import { goto } from '$app/navigation';
	import { token } from '$lib/stores';

	localStorage.removeItem('token');
	token.set(null);

	$: if ($token === null) goto('/');
</script>
