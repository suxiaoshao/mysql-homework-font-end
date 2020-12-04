import { httpPost } from './main';
import { TrainData } from './getAllTrain';

export async function postAddTrain(
  trainId: string,
  trainType: string,
  model: string,
  startStationId: number,
  destinationStationId: number,
  token: string,
): Promise<TrainData> {
  return await httpPost<
    { trainId: string; trainType: string; model: string; startStationId: number; destinationStationId: number },
    TrainData
  >(
    '/api/train/add',
    {
      trainType: trainType,
      trainId: trainId,
      model: model,
      startStationId: startStationId,
      destinationStationId: destinationStationId,
    },
    token,
  );
}

export async function postDeleteTrain(trainId: string, token: string): Promise<{}> {
  return await httpPost<{ trainId: string }, {}>(
    '/api/train/delete',
    {
      trainId: trainId,
    },
    token,
  );
}
