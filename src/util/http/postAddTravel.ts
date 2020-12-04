import { httpPost } from './main';
import { TravelInfoData } from './getTravelInfo';

export async function postAddTravel(
  orderId: string,
  ticketType: string,
  ticketPrice: number,
  passengerId: number,
  trainId: string,
  departureStationId: number,
  arrivalStationId: number,
  token: string,
): Promise<TravelInfoData> {
  return await httpPost<
    {
      orderId: string;
      ticketType: string;
      ticketPrice: number;
      passengerId: number;
      trainId: string;
      departureStationId: number;
      arrivalStationId: number;
    },
    TravelInfoData
  >(
    '/api/travel/add',
    {
      orderId: orderId,
      ticketPrice: ticketPrice,
      ticketType: ticketType,
      trainId: trainId,
      passengerId: passengerId,
      departureStationId: departureStationId,
      arrivalStationId: arrivalStationId,
    },
    token,
  );
}

export async function postDeleteTravel(orderId: string, token: string): Promise<undefined> {
  return await httpPost<{ orderId: string }, undefined>(
    '/api/travel/delete',
    {
      orderId: orderId,
    },
    token,
  );
}
