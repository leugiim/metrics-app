import { writable } from 'svelte/store';
import type { BearerToken } from '$lib/types/Auth';
import { browser } from '$app/environment';
import type { User } from '$lib/types/User';

export const loading = writable<boolean>(true);
export const token = writable<BearerToken>();
export const logedUser = writable<User | null>();
export const companyName = writable<string>();

if (browser) {
	token.set(localStorage.getItem('token') as BearerToken);

	// I use this to simulate a loading screen
	setTimeout(() => {
		loading.set(false);
	}, 2000);
}
