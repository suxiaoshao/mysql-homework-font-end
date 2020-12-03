import React from 'react';
import AdminSidebar from '../components/sidebar';
import { useAsyncFunc } from '../../../util/hooks/useAsyncFunc';
import { getAllTravel } from '../../../util/http/getAllTravel';
import { useToken } from '../../../util/store/token';

export default function Travel(): JSX.Element {
  const [token] = useToken();
  const [fn, loading, errorString, travelData] = useAsyncFunc(
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
  return <AdminSidebar className="travel" />;
}
