import React from 'react';
import AdminSidebar from '../components/sidebar';
import { useToken } from '../../../util/store/token';
import { useAsyncFunc } from '../../../util/hooks/useAsyncFunc';
import { getAllTrain, TrainData } from '../../../util/http/getAllTrain';
import MyTable from '../../../components/myTable/myTable';
import MyTableHead from '../../../components/myTable/myTableHead';
import { TableBody, TableCell } from '@material-ui/core';
import MyTableRow from '../../../components/myTable/myTableRow';
import TrainAdd from './trainAdd';
import UpdateTrain from './updateTrain';

const tableHead = ['列车号', '车型', '种类', '始发站', '终点站'];
export default function Train(): JSX.Element {
  const [token] = useToken();
  const [fn, loading, errorString, trainData, setTrainData] = useAsyncFunc(
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
        <MyTableHead
          tableHeadList={tableHead}
          more={
            <TrainAdd
              onAdd={(data) => {
                const newTrainData = [...(trainData ?? []), data];
                setTrainData(newTrainData);
              }}
            />
          }
        />
        <TableBody>
          {trainData?.map((value) => (
            <MyTableRow
              colSpan={6}
              openContent={
                <UpdateTrain
                  {...value}
                  onAdd={(newTrain) => {
                    const newTrainData = trainData?.map((item: TrainData) => {
                      return item.trainId === newTrain.trainId ? newTrain : item;
                    });
                    setTrainData(newTrainData);
                  }}
                  onDelete={() => {
                    const newTrainData = trainData?.filter((item) => {
                      return item.trainId !== value.trainId;
                    });
                    setTrainData(newTrainData);
                  }}
                />
              }
              key={value.trainId}
            >
              <TableCell>{value.trainId}</TableCell>
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
