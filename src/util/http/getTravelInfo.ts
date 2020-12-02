import { Station } from './getAllStation';
import { httpGet } from './main';

export interface TravelInfoData {
  orderId: string;
  ticketType: string;
  ticketPrice: number;
  departureStation: Station;
  passenger: Passenger;
  trainInfo: TrainInfo;
  arrivalStation: Station;
}

export interface Passenger {
  passengerId: number;
  idNumber: string;
  passengerName: string;
  gender: string;
  phoneNumber: string;
}

export interface TrainInfo {
  trainId: string;
  trainType: string;
  model: string;
}

export async function getTravelInfo(passengerId: number): Promise<TravelInfoData[]> {
  return await httpGet<{ passengerId: number }, TravelInfoData[]>('/api/passenger/getTravelInfo', {
    passengerId: passengerId,
  });
}
