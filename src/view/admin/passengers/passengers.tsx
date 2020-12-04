import React from 'react';
import AdminSidebar from '../components/sidebar';
import { useToken } from '../../../util/store/token';
import { useAsyncFunc } from '../../../util/hooks/useAsyncFunc';
import { getAllPassenger } from '../../../util/http/getAllPassenger';
import MyTable from '../../../components/myTable/myTable';
import MyTableHead from '../../../components/myTable/myTableHead';
import { TableBody, TableCell } from '@material-ui/core';
import MyTableRow from '../../../components/myTable/myTableRow';
import { Passenger } from '../../../util/http/getTravelInfo';
import AddPassenger from './addPassenger';
import UpdatePassenger from './updatePassenger';

const tableHead = ['用户id', '姓名', '性别', '电话号', '身份证号'];
export default function Passengers(): JSX.Element {
  const [token] = useToken();
  const [fn, loading, errorString, passengerData, setPassengerData] = useAsyncFunc(
    async () => {
      return await getAllPassenger(token);
    },
    [token],
    [false, undefined, []],
  );
  React.useEffect(() => {
    if (token !== '') {
      fn();
    }
  }, [fn]);
  return (
    <AdminSidebar className="query-trains">
      <MyTable loading={loading} errorString={errorString}>
        <MyTableHead
          tableHeadList={tableHead}
          more={
            <AddPassenger
              onAddPassenger={(newPassenger) => {
                const newPassengerData = [...(passengerData ?? []), newPassenger];
                setPassengerData(newPassengerData);
              }}
            />
          }
        />
        <TableBody>
          {passengerData?.map((value: Passenger) => (
            <MyTableRow
              colSpan={6}
              key={value.passengerId}
              openContent={
                <UpdatePassenger
                  onUpdate={(newPassenger) => {
                    const newPassengerData = passengerData?.map((item) => {
                      return item.passengerId === newPassenger.passengerId ? newPassenger : item;
                    });
                    setPassengerData(newPassengerData);
                  }}
                  onDelete={() => {
                    const newPassenger = passengerData?.filter((item) => {
                      return item.passengerId !== value.passengerId;
                    });
                    setPassengerData(newPassenger);
                  }}
                  {...value}
                />
              }
            >
              <TableCell>{value.passengerId}</TableCell>
              <TableCell align="right">{value.passengerName}</TableCell>
              <TableCell align="right">{value.gender}</TableCell>
              <TableCell align="right">{value.phoneNumber}</TableCell>
              <TableCell align="right">{value.idNumber}</TableCell>
            </MyTableRow>
          ))}
        </TableBody>
      </MyTable>
    </AdminSidebar>
  );
}
