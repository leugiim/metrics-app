import { writable } from 'svelte/store';
import type { BearerToken } from '$lib/types/Auth';
import { browser } from '$app/environment';

export const loading = writable<boolean>(true);
export const token = writable<BearerToken>();

if (browser) {
	token.set(localStorage.getItem('token') as BearerToken);
	loading.set(false);
}
