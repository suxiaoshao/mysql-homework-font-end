import { httpPost } from './main';
import { Station } from './getAllStation';

export async function postAddStation(
  stationName: string,
  phoneNumber: string,
  token: string,
  stationId?: number,
): Promise<Station> {
  return await httpPost<{ stationName: string; phoneNumber: string; stationId?: number }, Station>(
    '/api/station/add',
    {
      stationName: stationName,
      phoneNumber: phoneNumber,
      stationId: stationId,
    },
    token,
  );
}

export async function postDeleteStation(stationId: number, token: string): Promise<{}> {
  return await httpPost<{ stationId: number }, {}>(
    '/api/station/delete',
    {
      stationId: stationId,
    },
    token,
  );
}
