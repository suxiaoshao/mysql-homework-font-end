import React from 'react';
import AdminSidebar from '../components/sidebar';
import { useALlStation } from '../../../util/store/allStation';
import MyTable from '../../../components/myTable/myTable';
import { TableBody, TableCell } from '@material-ui/core';
import MyTableHead from '../../../components/myTable/myTableHead';
import MyTableRow from '../../../components/myTable/myTableRow';
import AddStation from './addStation';
import UpdateStation from './updateStation';

const tableHeadList = ['车站id', '车站名', '车站联系方式'];
export default function Station(): JSX.Element {
  const [allStation] = useALlStation();
  return (
    <AdminSidebar className={'query-trains'}>
      <MyTable loading={false} errorString={undefined}>
        <MyTableHead tableHeadList={tableHeadList} more={<AddStation />} />
        <TableBody>
          {allStation?.map((value) => (
            <MyTableRow openContent={<UpdateStation stationId={value.stationId} />} key={value.stationId} colSpan={4}>
              <TableCell>{value.stationId}</TableCell>
              <TableCell align="right">{value.stationName}</TableCell>
              <TableCell align="right">{value.phoneNumber}</TableCell>
            </MyTableRow>
          ))}
        </TableBody>
      </MyTable>
    </AdminSidebar>
  );
}
