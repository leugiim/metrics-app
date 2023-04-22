import { writable } from 'svelte/store';
import type { BearerToken } from '$lib/types/Auth';
import { browser } from '$app/environment';
import type { User } from '$lib/types/User';

export const loading = writable<boolean>(true);
export const token = writable<BearerToken>();
export const logedUser = writable<User | null>();

if (browser) {
	token.set(localStorage.getItem('token') as BearerToken);
	loading.set(false);
}
