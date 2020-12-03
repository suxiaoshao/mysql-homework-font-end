import React from 'react';
import AdminSidebar from '../components/sidebar';
import { useToken } from '../../../util/store/token';
import { useAsyncFunc } from '../../../util/hooks/useAsyncFunc';
import { getAllTrain } from '../../../util/http/getAllTrain';
import MyTable from '../../../components/myTable/myTable';
import MyTableHead from '../../../components/myTable/myTableHead';
import { TableBody, TableCell } from '@material-ui/core';
import MyTableRow from '../../../components/myTable/myTableRow';

const tableHead = ['列车号', '车型', '种类', '始发站', '终点站'];
export default function Train(): JSX.Element {
  const [token] = useToken();
  const [fn, loading, errorString, trainData] = useAsyncFunc(
    async () => {
      return await getAllTrain(token);
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
          {trainData?.map((value) => (
            <MyTableRow openContent={121323} key={value.trainId}>
              <TableCell align="right">{value.trainId}</TableCell>
              <TableCell align="right">{value.model}</TableCell>
              <TableCell align="right">{value.trainType}</TableCell>
              <TableCell align="right">{value.startStation.stationName}</TableCell>
              <TableCell align="right">{value.destinationStation.stationName}</TableCell>
            </MyTableRow>
          ))}
        </TableBody>
      </MyTable>
    </AdminSidebar>
  );
}
