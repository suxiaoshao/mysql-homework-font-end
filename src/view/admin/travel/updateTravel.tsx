import { Box, Button } from '@material-ui/core';
import { httpToast } from '../../../util/httpToast';
import React from 'react';
import { TravelInfoData } from '../../../util/http/getTravelInfo';
import { useToken } from '../../../util/store/token';
import { postDeleteTravel } from '../../../util/http/postAddTravel';

export default function UpdateTravel(props: TravelInfoData & { onDelete(): void }): JSX.Element {
  const [token] = useToken();
  return (
    <Box margin={1} className={'more-form'}>
      <Button
        color="secondary"
        variant={'contained'}
        onClick={() => {
          httpToast(async () => {
            return await postDeleteTravel(props.orderId, token);
          }, '删除成功').then(() => {
            props.onDelete();
          });
        }}
      >
        删除
      </Button>
    </Box>
  );
}
