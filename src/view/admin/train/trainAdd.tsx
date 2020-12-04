import MyAddCell from '../../../components/myTable/myAddCell';
import React from 'react';
import { TextField } from '@material-ui/core';
import MySelector from '../../../components/mySelector';
import { useALlStation } from '../../../util/store/allStation';
import { httpToast } from '../../../util/httpToast';
import { postAddTrain } from '../../../util/http/postAddTrain';
import { useToken } from '../../../util/store/token';
import { TrainData } from '../../../util/http/getAllTrain';

export default function TrainAdd(props: { onAdd(newTrain: TrainData): void }): JSX.Element {
  const [allStation] = useALlStation();
  const [token] = useToken();
  const [trainId, setTrainId] = React.useState<string>('');
  const [trainType, setTrainType] = React.useState<string>('');
  const [model, setModel] = React.useState<string>('');
  const [startStationId, setStartStationId] = React.useState<number>(-1);
  const [destinationStationId, setDestinationStationId] = React.useState<number>(-1);
  return (
    <MyAddCell
      disableClick={startStationId === -1 || destinationStationId === -1}
      title={'添加列车'}
      onAdd={async () => {
        return await httpToast(async () => {
          return await postAddTrain(trainId, trainType, model, startStationId, destinationStationId, token);
        }, '添加成功').then((data) => {
          props.onAdd(data);
        });
      }}
    >
      <TextField
        value={trainId}
        label={'列车号'}
        onChange={(e) => {
          setTrainId(e.target.value);
        }}
      />
      <TextField
        value={model}
        label={'车型'}
        onChange={(e) => {
          setModel(e.target.value);
        }}
      />
      <TextField
        value={trainType}
        label={'种类'}
        onChange={(e) => {
          setTrainType(e.target.value);
        }}
      />
      <MySelector
        value={startStationId}
        onValueChange={setStartStationId}
        label={'始发站'}
        itemList={allStation.map((value) => {
          return {
            text: value.stationName,
            value: value.stationId,
          };
        })}
      />
      <MySelector
        value={destinationStationId}
        onValueChange={setDestinationStationId}
        label={'终点站'}
        itemList={allStation.map((value) => {
          return {
            text: value.stationName,
            value: value.stationId,
          };
        })}
      />
    </MyAddCell>
  );
}
