import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { TimesData } from '../../../util/http/getTimesBydestinationStationId';
import MyTable from '../../../components/myTable/myTable';

const tableHeadList = ['列车号', '出发地', '目的地', '到站时间', '发车时间', '检票口', '状态'];
export default function QueryTrainTable(props: {
  timesData: TimesData[] | undefined;
  loading: boolean;
  errorString: string | undefined;
}): JSX.Element {
  return (
    <MyTable {...props}>
      <Table stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableHeadList.map((value, index) => (
              <TableCell key={value} align={index !== 0 ? 'right' : 'left'}>
                {value}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.timesData?.map((value) => (
            <TableRow key={value.trainId}>
              <TableCell>{value.trainId}</TableCell>
              <TableCell align="right">{value.startStationName}</TableCell>
              <TableCell align="right">{value.destinationStationName}</TableCell>
              <TableCell align="right">{value.arrivalTime}</TableCell>
              <TableCell align="right">{value.departureTime}</TableCell>
              <TableCell align="right">{value.ticketGate}</TableCell>
              <TableCell align="right">{value.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </MyTable>
  );
}
