import { Box, Button, TextField } from '@material-ui/core';
import React from 'react';
import './station.scss';
import { httpToast } from '../../../util/httpToast';
import { postAddStation, postDeleteStation } from '../../../util/http/postAddStation';
import { useToken } from '../../../util/store/token';
import { useALlStation } from '../../../util/store/allStation';
import { Station } from '../../../util/http/getAllStation';

export default function UpdateStation(props: Station): JSX.Element {
  const [token] = useToken();
  const [allStation, setAllStation] = useALlStation();
  const [stationName, setStationName] = React.useState<string>(props.stationName);
  const [phoneNumber, setPhoneNumber] = React.useState<string>(props.phoneNumber);
  return (
    <Box margin={1} className="more-form">
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
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          httpToast(async () => {
            return await postAddStation(stationName, phoneNumber, token, props.stationId);
          }, '成功修改').then((data) => {
            const newAllStation = allStation.map((value) => {
              return value.stationId === data.stationId ? data : value;
            });
            setAllStation(newAllStation);
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
            return await postDeleteStation(props.stationId, token);
          }, '删除成功').then(() => {
            const newAllStation = allStation.filter((value) => value.stationId !== props.stationId);
            setAllStation(newAllStation);
          });
        }}
      >
        删除
      </Button>
    </Box>
  );
}
