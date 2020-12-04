import { Box, Button } from '@material-ui/core';
import React from 'react';
import MySelector from '../../../components/mySelector';
import { useALlStation } from '../../../util/store/allStation';
import { TrainData } from '../../../util/http/getAllTrain';
import { httpToast } from '../../../util/httpToast';
import { postAddTrain, postDeleteTrain } from '../../../util/http/postAddTrain';
import { useToken } from '../../../util/store/token';

export default function UpdateTrain(
  props: TrainData & { onAdd(newTrain: TrainData): void; onDelete(): void },
): JSX.Element {
  const [allStation] = useALlStation();
  const [token] = useToken();
  const [startStationId, setStartStationId] = React.useState<number>(props.startStation.stationId);
  const [destinationStationId, setDestinationStationId] = React.useState<number>(props.destinationStation.stationId);
  return (
    <Box margin={1} className="more-form">
      <MySelector<number>
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
      <MySelector<number>
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
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          httpToast(async () => {
            return await postAddTrain(
              props.trainId,
              props.trainType,
              props.model,
              startStationId,
              destinationStationId,
              token,
            );
          }, '成功修改').then((data) => {
            props.onAdd(data);
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
            return await postDeleteTrain(props.trainId, token);
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
