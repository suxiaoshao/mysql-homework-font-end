import { createStore, createUseStore } from './store';

export const [getToken, addWatchToken, setToken, removeWatchToken] = createStore<string>('');

export const useToken = createUseStore<string>(getToken, addWatchToken, setToken, removeWatchToken);
