import { setRecord } from './store/recordInfo';

export function httpToast<T>(func: () => Promise<T>, successString: string): Promise<T> {
  return func()
    .then((value) => {
      setRecord({
        message: successString,
        severity: 'success',
        open: true,
      });
      return value;
    })
    .catch((err) => {
      setRecord({
        message: String(err),
        severity: 'error',
        open: true,
      });
      throw '';
    });
}
