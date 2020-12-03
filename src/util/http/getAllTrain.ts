import { Station } from './getAllStation';
import { httpGet } from './main';

export interface TrainData {
  trainId: string;
  trainType: string;
  model: string;
  startStation: Station;
  destinationStation: Station;
}

export async function getAllTrain(token: string): Promise<TrainData[]> {
  return await httpGet<undefined, TrainData[]>('/api/train/all', undefined, token);
}
