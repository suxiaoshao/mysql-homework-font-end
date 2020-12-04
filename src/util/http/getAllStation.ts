import { httpGet } from './main';

export interface Station {
  stationId: number;
  stationName: string;
  phoneNumber: string;
}

export async function getAllStation(): Promise<Station[]> {
  return await httpGet<undefined, Station[]>('/api/station/all', undefined);
}
