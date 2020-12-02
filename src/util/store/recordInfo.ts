import { createUseStoreFunc } from './store';
import { Color } from '@material-ui/lab';

export interface RecordInfo {
  message: string;
  severity: Color;
  open: boolean;
}

export const useRecordInfo = createUseStoreFunc<RecordInfo>({ open: false, message: '', severity: 'success' });
