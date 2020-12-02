import React from 'react';
import UserSidebar from '../components/sidebar';
import { useALlStation } from '../../../util/store/allStation';
import { Card, CardHeader, IconButton, Snackbar } from '@material-ui/core';
import './contact.scss';
import { FileCopy } from '@material-ui/icons';
import { useRecordInfo } from '../../../util/store/recordInfo';

export default function Contact(): JSX.Element {
  const [allStation] = useALlStation();
  const [open, setOpen] = React.useState<boolean>(false);
  const [, setRecordInfo] = useRecordInfo();
  return (
    <UserSidebar className="contact">
      {allStation.map((value) => (
        <Card key={value.stationId} className="contact-item">
          <CardHeader
            title={value.stationName}
            subheader={value.phoneNumber}
            action={
              <IconButton
                onClick={() => {
                  navigator.clipboard.writeText(value.phoneNumber).then(() => {
                    setRecordInfo({ severity: 'success', open: true, message: '复制成功' });
                  });
                }}
              >
                <FileCopy />
              </IconButton>
            }
          />
        </Card>
      ))}
      <Snackbar
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        message="复制成功"
      />
    </UserSidebar>
  );
}
