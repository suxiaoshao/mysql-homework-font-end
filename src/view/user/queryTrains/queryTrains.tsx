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
  const [gdcPrefix, setGdcPrefix] = React.useState<boolean>(false);
  const [fn, loading, errorString, timesData] = useAsyncFunc(
    async () => {
      return await getTimesByDestinationStationId(allMode ? 0 : activeStationId, gdcPrefix);
    },
    [allMode, activeStationId, gdcPrefix],
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
        gdcPrefix={gdcPrefix}
        onGdcPrefixChange={setGdcPrefix}
        onSearch={() => {
          fn();
        }}
      />
      <QueryTrainTable errorString={errorString} loading={loading} timesData={timesData} />
    </UserSidebar>
  );
}
