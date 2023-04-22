<script lang="ts">
	import LoginTextBox from '$lib/components/forms/LoginTextBox.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import { getInitialFetchResult } from '$lib/fetch';
	import { useFetchLogin } from '$lib/fetch/fetchUsers';
	import type { BearerToken, Token } from '$lib/types/Auth';
	import { FetchStatus } from '$lib/types/Fetch';

	let user: string;
	let pass: string;
	let errorMessage: string;
	let { status, httpStatus, message, content: token } = getInitialFetchResult<Token>();

	const handleLogin = () => {
		if (validateForm()) useFetchLogin({ status, httpStatus, message, content: token }, user, pass);
	};

	const validateForm = () => {
		errorMessage = '';
		if (user == '' || pass == '') {
			errorMessage = 'User and password are required';
			return false;
		}
		return true;
	};

	$: if ($status == FetchStatus.ERROR) errorMessage = 'Wrong user or password';

	$: if ($status == FetchStatus.SUCCESS && $token !== null) {
		const bearerToken: BearerToken = `Bearer ${$token}`;
		localStorage.setItem('token', bearerToken);
		location.reload();
	}
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-muted py-12 px-4 sm:px-6 lg:px-8">
	<div class="w-full max-w-md space-y-8">
		<div class="absolute left-10 top-10">
			<Logo src="img/factorial.svg" alt="Factorial Logo" width={200} />
		</div>
		<h1 class="text-[33px] font-bold text-dark">Log In</h1>
		<div class="flex flex-col gap-3 -space-y-px rounded-md shadow-sm">
			<div>
				<LoginTextBox type="text" placeholder="User" icon="fa-solid fa-user" bind:value={user} />
			</div>
			<div>
				<LoginTextBox
					type="password"
					placeholder="Password"
					icon="fa-solid fa-lock"
					bind:value={pass}
				/>
			</div>

			{#if errorMessage}
				<div class="text-sm text-red-500">{errorMessage}</div>
			{/if}
		</div>

		<div>
			<button
				on:click={handleLogin}
				class="group relative flex w-full justify-center bg-secondary py-2 px-3 text-sm font-bold uppercase text-white hover:brightness-110"
			>
				Log In
				<i class="fa-solid fa-chevron-right absolute inset-y-0 right-3 flex items-center pl-3" />
			</button>
		</div>

		<hr class="m-auto h-2 w-9/12 bg-primary" />
	</div>
</div>
