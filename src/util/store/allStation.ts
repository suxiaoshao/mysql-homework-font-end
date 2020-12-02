import { createUseStoreFunc } from './store';
import { Station } from '../http/getAllStation';

export const useALlStation = createUseStoreFunc<Station[]>([]);
