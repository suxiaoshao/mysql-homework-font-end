import MyAddCell from '../../../components/myTable/myAddCell';
import { TextField } from '@material-ui/core';
import React from 'react';
import MySelector from '../../../components/mySelector';
import { postAddPassenger } from '../../../util/http/postAddPassenger';
import { httpToast } from '../../../util/httpToast';
import { useToken } from '../../../util/store/token';
import { Passenger } from '../../../util/http/getTravelInfo';

export default function AddPassenger(props: { onAddPassenger(newPassenger: Passenger): void }): JSX.Element {
  const [genderList] = React.useState<{ text: string; value: number }[]>([
    { value: 0, text: '男' },
    { value: 1, text: '女' },
  ]);
  const [token] = useToken();
  const [gender, setGender] = React.useState<number>(-1);
  const [passengerId, setPassengerId] = React.useState<number>(0);
  const [passengerName, setPassengerName] = React.useState<string>('');
  const [idNumber, setIdNumber] = React.useState<string>('');
  const [phoneNumber, setPhoneNumber] = React.useState<string>('');
  const genderValue = React.useMemo<string>(() => {
    return (
      genderList.find((value) => {
        return value.value === gender;
      })?.text ?? ''
    );
  }, [gender]);
  return (
    <MyAddCell
      disableClick={genderValue === ''}
      title={'添加乘客'}
      onAdd={async () => {
        await httpToast(async () => {
          return await postAddPassenger(passengerId, idNumber, passengerName, genderValue, phoneNumber, token);
        }, '添加成功').then((data) => {
          props.onAddPassenger(data);
        });
      }}
    >
      <TextField
        label="用户id"
        type="number"
        value={passengerId}
        onChange={(e) => {
          setPassengerId(parseInt(e.target.value));
        }}
      />
      <TextField
        label="姓名"
        value={passengerName}
        onChange={(e) => {
          setPassengerName(e.target.value);
        }}
      />
      <MySelector value={gender} onValueChange={setGender} label={'性别'} itemList={genderList} />
      <TextField
        label="电话号"
        type="tel"
        value={phoneNumber}
        onChange={(e) => {
          setPhoneNumber(e.target.value);
        }}
      />
      <TextField
        label="身份证号"
        value={idNumber}
        onChange={(e) => {
          setIdNumber(e.target.value);
        }}
      />
    </MyAddCell>
  );
}
