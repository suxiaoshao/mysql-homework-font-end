import { httpGet } from './main';
import { Passenger } from './getTravelInfo';

export async function getAllPassenger(token: string): Promise<Passenger[]> {
  return await httpGet<undefined, Passenger[]>('/api/passenger/all', undefined, token);
}
