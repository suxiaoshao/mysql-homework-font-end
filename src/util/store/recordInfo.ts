import { createStore, createUseStore } from './store';
import { Color } from '@material-ui/lab';

export interface RecordInfo {
  message: string;
  severity: Color;
  open: boolean;
}

export const [getRecord, addWatchRecord, setRecord, removeWatchRecord] = createStore<RecordInfo>({
  open: false,
  message: '',
  severity: 'success',
});

export const useRecordInfo = createUseStore<RecordInfo>(getRecord, addWatchRecord, setRecord, removeWatchRecord);
