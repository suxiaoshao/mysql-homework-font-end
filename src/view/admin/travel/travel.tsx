import React from 'react';
import AdminSidebar from '../components/sidebar';
import { useAsyncFunc } from '../../../util/hooks/useAsyncFunc';
import { getAllTravel } from '../../../util/http/getAllTravel';
import { useToken } from '../../../util/store/token';
import MyTable from '../../../components/myTable/myTable';
import MyTableHead from '../../../components/myTable/myTableHead';
import { TableBody, TableCell } from '@material-ui/core';
import MyTableRow from '../../../components/myTable/myTableRow';
import AddTravel from './AddTravel';
import UpdateTravel from './updateTravel';
import { TravelInfoData } from '../../../util/http/getTravelInfo';

const tableHead = ['乘客名', '订单号', '座位类型', '价格', '起点站', '终点站', '列车号'];
export default function Travel(): JSX.Element {
  const [token] = useToken();
  const [fn, loading, errorString, travelData, setTravelData] = useAsyncFunc(
    async () => {
      return await getAllTravel(token);
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
            <AddTravel
              onAdd={(newTravel) => {
                const newTravelData = [...(travelData ?? []), newTravel];
                setTravelData(newTravelData);
              }}
            />
          }
        />
        <TableBody>
          {travelData?.map((value: TravelInfoData) => (
            <MyTableRow
              openContent={
                <UpdateTravel
                  {...value}
                  onDelete={() => {
                    const newTravelData = travelData?.filter((item) => {
                      return item.orderId !== value.orderId;
                    });
                    setTravelData(newTravelData);
                  }}
                />
              }
              key={value.orderId}
              colSpan={8}
            >
              <TableCell>{value.passenger.passengerName}</TableCell>
              <TableCell align="right">{value.orderId}</TableCell>
              <TableCell align="right">{value.ticketType}</TableCell>
              <TableCell align="right">{value.ticketPrice}</TableCell>
              <TableCell align="right">{value.departureStation.stationName}</TableCell>
              <TableCell align="right">{value.arrivalStation.stationName}</TableCell>
              <TableCell align="right">{value.trainInfo.trainId}</TableCell>
            </MyTableRow>
          ))}
        </TableBody>
      </MyTable>
    </AdminSidebar>
  );
}
