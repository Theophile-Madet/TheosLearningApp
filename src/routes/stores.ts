import { writable } from 'svelte/store';

export const hasAnswered = writable(false);
export const csrfToken = writable('');