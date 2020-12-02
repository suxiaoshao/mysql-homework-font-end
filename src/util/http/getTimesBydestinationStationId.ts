import { httpGet } from './main';

export interface TimesData {
  trainId: string;
  destinationStationName: string;
  startStationName: string;
  arrivalTime: string;
  departureTime: string;
  ticketGate: string;
  status: string;
  startStationId: number;
  destinationStationId: number;
}

export async function getTimesByDestinationStationId(destinationStationId: number): Promise<TimesData[]> {
  return await httpGet<{ destinationStationId: number }, TimesData[]>('/api/times', {
    destinationStationId: destinationStationId,
  });
}
