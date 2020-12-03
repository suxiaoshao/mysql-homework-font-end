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

const tableHead = ['用户id', '姓名', '性别', '电话号', '身份证号'];
export default function Passengers(): JSX.Element {
  const [token] = useToken();
  const [fn, loading, errorString, passengerData] = useAsyncFunc(
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
        <MyTableHead tableHeadList={tableHead} more />
        <TableBody>
          {passengerData?.map((value: Passenger) => (
            <MyTableRow key={value.passengerId} openContent={112233}>
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
