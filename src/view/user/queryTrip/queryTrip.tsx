import React, { ChangeEvent } from 'react';
import UserSidebar from '../components/sidebar';
import { IconButton, InputAdornment, TableBody, TableCell, TableRow, TextField } from '@material-ui/core';
import './queryTrip.scss';
import { AccountCircle, Search } from '@material-ui/icons';
import MyTable from '../../../components/myTable/myTable';
import { useAsyncFunc } from '../../../util/hooks/useAsyncFunc';
import { getTravelInfo } from '../../../util/http/getTravelInfo';
import MyTableHead from '../../../components/myTable/myTableHead';

const tableHead = ['乘客名', '订单号', '座位类型', '价格', '起点站', '终点站', '列车号'];
export default function QueryTrip(): JSX.Element {
  const [passengerId, setPassengerId] = React.useState<string>('');
  const [fn, loading, errorString, travelInfoData] = useAsyncFunc(
    async () => {
      return await getTravelInfo(parseInt(passengerId));
    },
    [passengerId],
    [false, '暂无搜索', undefined],
  );
  return (
    <UserSidebar className="query-trip">
      <TextField
        label="用户id"
        value={passengerId}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setPassengerId(!isNaN(parseInt(e.target.value)) ? String(parseInt(e.target.value)) : '');
        }}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
          endAdornment: (
            <IconButton
              disabled={passengerId === ''}
              onClick={() => {
                fn();
              }}
            >
              <Search />
            </IconButton>
          ),
        }}
        placeholder="使用用户id搜索"
      />
      <MyTable loading={loading} errorString={errorString}>
        <MyTableHead tableHeadList={tableHead} more={false} />
        <TableBody>
          {travelInfoData?.map((value) => (
            <TableRow key={value.orderId}>
              <TableCell>{value.passenger.passengerName}</TableCell>
              <TableCell align="right">{value.orderId}</TableCell>
              <TableCell align="right">{value.ticketType}</TableCell>
              <TableCell align="right">{value.ticketPrice}</TableCell>
              <TableCell align="right">{value.departureStation.stationName}</TableCell>
              <TableCell align="right">{value.arrivalStation.stationName}</TableCell>
              <TableCell align="right">{value.trainInfo.trainId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MyTable>
    </UserSidebar>
  );
}
