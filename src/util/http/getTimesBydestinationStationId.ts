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

export async function getTimesByDestinationStationId(
  destinationStationId: number,
  gdcPrefix: boolean,
): Promise<TimesData[]> {
  return await httpGet<{ destinationStationId: number; gdcPrefix: boolean }, TimesData[]>('/api/times', {
    destinationStationId: destinationStationId,
    gdcPrefix: gdcPrefix,
  });
}
