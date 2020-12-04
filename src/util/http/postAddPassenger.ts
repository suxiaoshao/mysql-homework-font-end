import { httpPost } from './main';
import { Passenger } from './getTravelInfo';

export async function postAddPassenger(
  passengerId: number,
  idNumber: string,
  passengerName: string,
  gender: string,
  phoneNumber: string,
  token: string,
): Promise<Passenger> {
  return await httpPost<
    { passengerId: number; idNumber: string; passengerName: string; gender: string; phoneNumber: string },
    Passenger
  >(
    '/api/passenger/add',
    {
      passengerId: passengerId,
      idNumber: idNumber,
      passengerName: passengerName,
      gender: gender,
      phoneNumber: phoneNumber,
    },
    token,
  );
}

export async function postDeletePassenger(passengerId: number, token: string): Promise<undefined> {
  return await httpPost<{ passengerId: number }, undefined>(
    '/api/passenger/delete',
    {
      passengerId: passengerId,
    },
    token,
  );
}
