import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { useRecordInfo } from '../util/store/recordInfo';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function MyRecord(): JSX.Element {
  const [recordInfo, setRecordInfo] = useRecordInfo();

  return (
    <Snackbar
      open={recordInfo.open}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      autoHideDuration={6000}
      onClose={() => {
        setRecordInfo({
          open: false,
          severity: 'success',
          message: '',
        });
      }}
    >
      <Alert
        onClose={() => {
          setRecordInfo({
            open: false,
            severity: 'success',
            message: '',
          });
        }}
        severity={recordInfo.severity}
      >
        {recordInfo.message}
      </Alert>
    </Snackbar>
  );
}
