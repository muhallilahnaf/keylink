import { writable } from "svelte/store";
import keys from '$lib/util/localStorageKey.js'
import {browser} from '$app/environment'

const persistentStore = (key, initial) => {

    if (!browser) {
        return writable(initial)
    }
  
    if (localStorage.getItem(key) === null) {
        localStorage.setItem(key, JSON.stringify(initial));
    }
  
    const saved = JSON.parse(localStorage.getItem(key));
  
    const { subscribe, set, update } = writable(saved);
  
    return {
        subscribe,
        set: (value) => {
            localStorage.setItem(key, JSON.stringify(value));
            return set(value);
        },
        update,
    };
};

export const KW = persistentStore(keys.KW, {});

export const existingKW = persistentStore(keys.existingKW, []);

export const newKW = persistentStore(keys.newKW, {});

export const currentChunk = writable('');
export const LSI = writable([]);

export const toast = writable({
    message: '',
    color: ''
})
