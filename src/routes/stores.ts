import { writable } from 'svelte/store';

export const hasAnswered = writable(false);
export const csrfToken = writable('');
export const sessionId = writable('');
export const apiError = writable('');