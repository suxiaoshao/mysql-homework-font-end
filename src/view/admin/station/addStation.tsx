import { TextField } from '@material-ui/core';
import React from 'react';
import { httpToast } from '../../../util/httpToast';
import { postAddStation } from '../../../util/http/postAddStation';
import { useToken } from '../../../util/store/token';
import { useALlStation } from '../../../util/store/allStation';
import MyAddCell from '../../../components/myTable/myAddCell';

export default function AddStation(): JSX.Element {
  const [token] = useToken();
  const [allStation, setAllStation] = useALlStation();
  const [stationName, setStationName] = React.useState<string>('');
  const [phoneNumber, setPhoneNumber] = React.useState<string>('');
  return (
    <MyAddCell
      title={'添加一个车站'}
      onAdd={async () => {
        await httpToast(async () => {
          return await postAddStation(stationName, phoneNumber, token);
        }, '添加成功').then((data) => {
          const newAllStation = [...allStation, data];
          setAllStation(newAllStation);
        });
      }}
    >
      <TextField
        label="车站名"
        value={stationName}
        onChange={(e) => {
          setStationName(e.target.value);
        }}
      />
      <TextField
        label="车站电话"
        type="tel"
        value={phoneNumber}
        onChange={(e) => {
          setPhoneNumber(e.target.value);
        }}
      />
    </MyAddCell>
  );
}
