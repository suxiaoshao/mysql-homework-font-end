import MyAddCell from '../../../components/myTable/myAddCell';
import React from 'react';
import { Passenger, TrainInfo, TravelInfoData } from '../../../util/http/getTravelInfo';
import { useALlStation } from '../../../util/store/allStation';
import MySelector from '../../../components/mySelector';
import { TextField } from '@material-ui/core';
import { getAllPassenger } from '../../../util/http/getAllPassenger';
import { useToken } from '../../../util/store/token';
import { getAllTrain } from '../../../util/http/getAllTrain';
import { httpToast } from '../../../util/httpToast';
import { postAddTravel } from '../../../util/http/postAddTravel';

export default function AddTravel(props: { onAdd(newTravel: TravelInfoData): void }): JSX.Element {
  const [token] = useToken();
  const [orderId, setOrderId] = React.useState<string>('');
  const [price, setPrice] = React.useState<number>(0);
  const [ticketType, setTicketType] = React.useState<string>('');
  const [allPassenger, setAllPassenger] = React.useState<Passenger[]>([]);
  const [allStation] = useALlStation();
  const [allTrain, setAllTrain] = React.useState<TrainInfo[]>([]);
  const [passengerId, setPassengerId] = React.useState<number>(-1);
  const [trainId, setTrainId] = React.useState<string>('');
  const [departureStationId, setDepartureStationId] = React.useState<number>(-1);
  const [arrivalStationId, setArrivalStationId] = React.useState<number>(-1);
  React.useEffect(() => {
    if (token !== '') {
      getAllPassenger(token).then((data) => {
        setAllPassenger(data);
      });
      getAllTrain(token).then((data) => {
        setAllTrain(data);
      });
    }
  }, [token]);
  const allStationItemList = React.useMemo<{ text: string; value: number }[]>(
    () =>
      allStation.map((value) => ({
        text: value.stationName,
        value: value.stationId,
      })),
    [allStation],
  );
  return (
    <MyAddCell
      title={'添加旅行'}
      onAdd={async () => {
        return await httpToast(async () => {
          return await postAddTravel(
            orderId,
            ticketType,
            price,
            passengerId,
            trainId,
            departureStationId,
            arrivalStationId,
            token,
          );
        }, '添加成功').then((data) => {
          props.onAdd(data);
        });
      }}
    >
      <TextField
        value={orderId}
        onChange={(e) => {
          setOrderId(e.target.value);
        }}
        label={'订单号'}
      />
      <MySelector<number>
        value={passengerId}
        onValueChange={setPassengerId}
        label={'乘客'}
        itemList={allPassenger.map((value) => ({
          text: `${value.passengerName}-${value.passengerId}`,
          value: value.passengerId,
        }))}
      />
      <MySelector<string>
        value={trainId}
        onValueChange={setTrainId}
        label={'列车'}
        itemList={allTrain.map((value) => ({ text: value.trainId, value: value.trainId }))}
      />
      <MySelector<number>
        value={departureStationId}
        onValueChange={setDepartureStationId}
        label={'出发地'}
        itemList={allStationItemList}
      />
      <MySelector<number>
        value={arrivalStationId}
        onValueChange={setArrivalStationId}
        label={'目的地'}
        itemList={allStationItemList}
      />
      <TextField
        value={price}
        onChange={(e) => {
          setPrice(parseFloat(e.target.value));
        }}
        type={'number'}
        label={'价格'}
      />
      <TextField
        value={ticketType}
        onChange={(e) => {
          setTicketType(e.target.value);
        }}
        label={'座位类型'}
      />
    </MyAddCell>
  );
}
