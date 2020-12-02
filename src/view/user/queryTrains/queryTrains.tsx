import React from 'react';
import UserSidebar from '../components/sidebar';
import axios from 'axios';
import QueryTrainForm from './queryTrainForm';
import './queryTrain.scss';
import QueryTrainTable from './queryTrainTable';
import { useAsyncFunc } from '../../../util/hooks/useAsyncFunc';
import { getTimesByDestinationStationId } from '../../../util/http/getTimesBydestinationStationId';

axios.defaults.withCredentials = true;

export default function QueryTrains(): JSX.Element {
  const [allMode, setAllMode] = React.useState<boolean>(true);
  const [activeStationId, setActiveStationId] = React.useState<number>(1);
  const [fn, loading, errorString, timesData] = useAsyncFunc(
    async () => {
      if (allMode) {
        return await getTimesByDestinationStationId(0);
      } else {
        return await getTimesByDestinationStationId(activeStationId);
      }
    },
    [allMode, activeStationId],
    [false, undefined, []],
  );
  React.useEffect(() => {
    fn();
  }, []);
  return (
    <UserSidebar className="query-trains">
      <QueryTrainForm
        activeStationId={activeStationId}
        onActiveStationChange={setActiveStationId}
        allMode={allMode}
        onAllModeChange={setAllMode}
        onSearch={() => {
          fn();
        }}
      />
      <QueryTrainTable errorString={errorString} loading={loading} timesData={timesData} />
    </UserSidebar>
  );
}
