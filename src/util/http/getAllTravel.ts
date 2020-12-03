import { TravelInfoData } from './getTravelInfo';
import { httpGet } from './main';

export async function getAllTravel(token: string): Promise<TravelInfoData[]> {
  return await httpGet<undefined, TravelInfoData[]>('/api/travel/all', undefined, token);
}
