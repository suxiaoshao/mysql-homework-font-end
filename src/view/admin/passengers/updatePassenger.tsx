import { Box, Button, TextField } from '@material-ui/core';
import React from 'react';
import { Passenger } from '../../../util/http/getTravelInfo';
import { httpToast } from '../../../util/httpToast';
import { postAddPassenger, postDeletePassenger } from '../../../util/http/postAddPassenger';
import { useToken } from '../../../util/store/token';

export default function UpdatePassenger(
  props: Passenger & { onUpdate(newPassenger: Passenger): void; onDelete(): void },
): JSX.Element {
  const [phoneNumber, setPhoneNumber] = React.useState<string>('');
  const [token] = useToken();
  return (
    <Box margin={1} className="more-form">
      <TextField
        label="电话号"
        type="tel"
        value={phoneNumber}
        onChange={(e) => {
          setPhoneNumber(e.target.value);
        }}
      />
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          httpToast(async () => {
            return await postAddPassenger(
              props.passengerId,
              props.idNumber,
              props.passengerName,
              props.gender,
              phoneNumber,
              token,
            );
          }, '成功修改').then((data) => {
            props.onUpdate(data);
          });
        }}
      >
        修改
      </Button>
      <Button
        color="secondary"
        variant={'contained'}
        onClick={() => {
          httpToast(async () => {
            return await postDeletePassenger(props.passengerId, token);
          }, '删除成功').then(() => {
            props.onDelete();
          });
        }}
      >
        删除
      </Button>
    </Box>
  );
}
